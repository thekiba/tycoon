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
    const sortedAdsWorstFirst =
      this.domain.ad.getAllAds(this.domain.site.getAll())
          .map((ad) => this.domain.ad.getAdStats(this.domain.site.find(ad.siteId), ad))
          .sort((a, b) => a.profitPerHour - b.profitPerHour);

    const sitesWithALotAds =
      this.domain.site.getAll()
          .filter((site) => this.domain.site.getAdsCount(site) > 3);

    if (sitesWithALotAds.length > 0) {
      const [ worstAd ] = sortedAdsWorstFirst;
      const [ fromSite ] = sitesWithALotAds;

      if (worstAd.siteId === fromSite.id) {
        console.info(`Remove worst ad with profit \$${worstAd.profitPerHour}!`);
        await this.domain.ad.delete(worstAd);
      } else {
        const toSite = this.domain.site.find(worstAd.siteId);
        console.info(`Remove worst ad with profit \$${worstAd.profitPerHour}!`);
        await this.domain.ad.delete(worstAd);
        const [ ad ] = this.domain.site.getAds(fromSite);
        const adWithProfit = this.domain.ad.getAdStats(toSite, ad);
        console.info(`Enable ad with profit \$${adWithProfit.profitPerHour} for ${toSite.domain}!`);
        await this.domain.site.enableAd(toSite, ad);
      }
    }

    const sitesWithFullAds =
      this.domain.site.getAll()
          .filter((site) =>
            this.domain.site.getAdsCount(site) === 3 ||
            this.domain.site.hasFindAdTask(site));

    if (sitesWithFullAds.length === this.domain.site.getAll().length) {
      let sites = this.domain.site.getAll();
      let [ previous, ...otherSites ] = sites;
      sites = [ ...otherSites, previous ];
      for (const site of sites) {
        const [ ad ] = this.domain.site.getAds(site);
        const adWithProfit = this.domain.ad.getAdStats(previous, ad);
        console.info(`Enable ad with profit \$${adWithProfit.profitPerHour} for ${previous.domain}!`);
        await this.domain.site.enableAd(previous, ad);
        console.info(`Starting research ad of site ${site.domain}!`);
        await this.domain.site.researchAd(site);
      }
    }

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
