import { DomainConfig, DomainService, Game, GameBehavior } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({
  author: 'thekiba',
  name: 'update-ads'
})
@injectable()
export class UpdateAdsGame implements GameBehavior {

  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async start(): Promise<void> {
    const sites = this.domain.site.getAll();

    const normalizedSites =
      sites
        .filter((site) =>
          this.domain.site.getEnabledAdsCount(site) === 3 &&
          !this.domain.site.hasFindAdTask(site));

    if (normalizedSites.length === sites.length) {
      // is normalized
      let sites = this.domain.site.getAll();
      let [ previous, ...otherSites ] = sites;
      sites = [ ...otherSites, previous ];
      for (const site of sites) {
        const [ ad ] = this.domain.site.getAds(site);
        const adWithProfit = this.domain.ad.getAdStats(previous, ad);
        console.info(`Move ad with profit \$${ adWithProfit.profitPerHour } from ${ site.domain } to ${ previous.domain }!`);
        await this.domain.site.moveAd(previous, ad);
        console.info(`Starting research ad of site ${ site.domain }!`);
        await this.domain.site.researchAd(site);
        previous = site;
      }
    }

    if (normalizedSites.length !== sites.length) {
      // is not normalized

      const tasks =
        this.domain.task.getTasks()
            .filter((task) => task.zone === 'searchAd');

      if (tasks.length > 0) {

        const ts = new Date().getTime() / 1000;
        const completedTasks = tasks.filter((task) => ts > task.endTime);

        if (completedTasks.length === 1) {
          const [ task ] = completedTasks;
          const toSite = sites.find((s) => s.id !== task.siteId);
          const fromSite = this.domain.site.find(task.siteId);
          const [ ad ] = this.domain.site.getAds(fromSite);
          await this.domain.site.moveAd(toSite, ad);
        }

        if (completedTasks.length > 1) {
          let sites = completedTasks.map((task) => this.domain.site.find(task.siteId));
          let [ previous, ...otherSites ] = sites;
          sites = [ ...otherSites, previous ];
          for (const site of sites) {
            const [ ad ] = this.domain.site.getAds(site);
            const adWithProfit = this.domain.ad.getAdStats(previous, ad);
            console.info(`Move ad with profit \$${ adWithProfit.profitPerHour } from ${ site.domain } to ${ previous.domain }!`);
            await this.domain.site.moveAd(previous, ad);
            previous = site;
          }
        }

        if (completedTasks.length < 1) {
          console.log(`Waiting completing tasks: ${tasks.length}!`);
        }
      } else {

        const allAds = this.domain.ad.getAllAds(sites);

        if (allAds.length > sites.length * 3) {
          // need to reorder new ads and delete worst
          const [ site ] = this.domain.site.getAll();
          const extraAds = this.domain.ad.getAllAds(sites).filter((ad) => this.domain.ad.isDisabled(ad));
          for (const ad of extraAds.map((a) => this.domain.ad.getAdStats(site, a))) {
            if (ad.importunity > 50) {
              await this.domain.ad.delete(ad);
              continue;
            }

            const [ worstAd ] =
              this.domain.ad.getAllAds(sites)
                  .filter((ad) => this.domain.ad.isEnabled(ad))
                  .map((a) => this.domain.ad.getAdStats(site, a))
                  .sort((a, b) => a.profitPerHour - b.profitPerHour);

            if (ad.profitPerHour > worstAd.profitPerHour) {
              const selectedSite = this.domain.site.find(worstAd.siteId);
              console.info(`Remove worst ad with profit \$${ worstAd.profitPerHour } for ${ selectedSite.domain }!`);
              await this.domain.ad.delete(worstAd);
              console.info(`Enable extra ad with profit \$${ ad.profitPerHour } for ${ selectedSite.domain }!`);
              await this.domain.site.enableAd(selectedSite, ad);
            } else {
              console.info(`Remove extra ad with profit \$${ ad.profitPerHour }!`);
              await this.domain.ad.delete(ad);
            }
          }
        }

        if (allAds.length === sites.length * 3) {
          // need to reorder ads
          for (const site of sites) {
            if (this.domain.site.getAdsCount(site) > 3) {
              const siteNeededAd = sites.find((s) => this.domain.site.getAdsCount(s) < 3);
              const [ ad ] = this.domain.site.getAds(site).map((a) => this.domain.ad.getAdStats(site, ad));
              console.info(`Move ad \$${ ad.profitPerHour } from site ${ site.domain } to ${ siteNeededAd.domain }!`);
              await this.domain.site.moveAd(siteNeededAd, ad);
              break;
            }
          }
        }

        if (allAds.length < sites.length * 3) {
          // need to find ads for all sites
          for (const site of this.domain.site.getAll()) {
            if (this.domain.site.getAdsCount(site) === 3) {
              for (const ad of this.domain.site.getDisabledAds(site)) {
                console.info(`Enable disabled ad for ${ site.domain }!`);
                await this.domain.site.enableAd(site, ad);
              }
            }

            if (this.domain.site.getAdsCount(site) < 3) {
              if (!this.domain.site.hasFindAdTask(site)) {
                console.info(`Find ad for own site ${ site.domain }!`);
                await this.domain.site.researchAd(site);
              }
            }
          }
        }
      }

    }

    // const sortedAdsWorstFirst =
    //   this.domain.ad.getAllAds(this.domain.site.getAll())
    //       .map((ad) => this.domain.ad.getAdStats(this.domain.site.find(ad.siteId), ad))
    //       .sort((a, b) => a.profitPerHour - b.profitPerHour);
    //
    // const sitesWithALotAds =
    //   this.domain.site.getAll()
    //       .filter((site) => this.domain.site.getAdsCount(site) > 3);
    //
    // if (sitesWithALotAds.length > 0) {
    //   const [ worstAd ] = sortedAdsWorstFirst;
    //   const [ fromSite ] = sitesWithALotAds;
    //
    //   if (worstAd.siteId === fromSite.id) {
    //     console.info(`Remove worst ad with profit \$${worstAd.profitPerHour}!`);
    //     await this.domain.ad.delete(worstAd);
    //   } else {
    //     const toSite = this.domain.site.find(worstAd.siteId);
    //     console.info(`Remove worst ad with profit \$${worstAd.profitPerHour}!`);
    //     await this.domain.ad.delete(worstAd);
    //     const [ ad ] = this.domain.site.getAds(fromSite);
    //     const adWithProfit = this.domain.ad.getAdStats(toSite, ad);
    //     console.info(`Enable ad with profit \$${adWithProfit.profitPerHour} for ${toSite.domain}!`);
    //     await this.domain.site.enableAd(toSite, ad);
    //   }
    // }
    //
    // const sitesWithFullAds =
    //   this.domain.site.getAll()
    //       .filter((site) =>
    //         this.domain.site.getAdsCount(site) === 3 &&
    //         !this.domain.site.hasFindAdTask(site));
    //
    // if (sitesWithFullAds.length === this.domain.site.getAll().length) {
    //   let sites = this.domain.site.getAll();
    //   let [ previous, ...otherSites ] = sites;
    //   sites = [ ...otherSites, previous ];
    //   for (const site of sites) {
    //     const [ ad ] = this.domain.site.getAds(site);
    //     const adWithProfit = this.domain.ad.getAdStats(previous, ad);
    //     console.info(`Enable ad with profit \$${adWithProfit.profitPerHour} for ${previous.domain}!`);
    //     await this.domain.site.enableAd(previous, ad);
    //     console.info(`Starting research ad of site ${site.domain}!`);
    //     await this.domain.site.researchAd(site);
    //   }
    // }

    // for (const site of this.domain.site.getAll()) {
    //   // if (this.domain.site.getAdsCount(site) === 3) {
    //   //   for (const ad of this.domain.site.getDisabledAds(site)) {
    //   //     console.info(`Enable disabled ad for ${ site.domain }!`);
    //   //     await this.domain.site.enableAd(site, ad);
    //   //   }
    //   // }
    //
    //   if (this.domain.site.getAdsCount(site) < 3) {
    //     if (!this.domain.site.hasFindAdTask(site)) {
    //       console.info(`Find ad for own site ${ site.domain }!`);
    //       await this.domain.site.researchAd(site);
    //     }
    //   }
    // }
  }
}
