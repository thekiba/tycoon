import { DomainConfig, DomainService, Game, GameBehavior, Site, Specialty } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({
  author: 'thekiba',
  name: 'start-level-up',
  ws: false
})
@injectable()
export class StartLevelUpGame implements GameBehavior {
  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async start(): Promise<void> {
    console.log(`
      Balance: ${this.domain.state.state.person.balanceUsd}\$
      Level:   ${this.domain.state.state.person.level}
      Exp:     ${this.domain.state.state.person.score} of ${this.domain.state.state.person.nextScore}
    `);

    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.canPayForHosting(site)) {
        if (site.hostingId === 2 && this.domain.state.state.person.balanceUsd > 35000) {
          console.log(`Payment $350 invoke for ${site.domain} hosting!`);
          await this.domain.site.payForHosting(site);
        }
      }
      if (this.domain.site.canNormalizeSite(site)) {
        console.log(`Site ${site.domain} has been normalized!`);
        await this.domain.site.normalizeSite(site);
      }
    }

    for (const worker of this.domain.worker.getAll()) {
      if (this.domain.worker.isWorking(worker)) {
        if (this.domain.worker.isWorkCompleted(worker)) {
          console.info(`${worker.name} complete own work!`);
          await this.domain.worker.completeWork(worker);
        }
      }
    }

    // for (const site of this.domain.site.getSortedSitesByProfitPerUser()) {
    //   const profit = this.domain.site.getProfitPerUser(site);
    //
    //   console.info(`${site.domain} has profit \$${profit}`);
    // }

    for (const worker of this.domain.worker.getAll()) {
      if (this.domain.worker.isIdle(worker)) {
        const workerSpecialty = this.domain.worker.getSpecialty(worker);

        let site: Site;
        switch (workerSpecialty) {

          case Specialty.marketing: {
            site =
              this.domain.site.getSortedSitesByTraffic()
                  .find((site) =>
                    !this.domain.site.hasActivedContent(site) &&
                    !this.domain.site.hasDisabledContent(site)
                  );
            break;
          }

          default: {
            site = this.domain.site.getSortedSites().find((site) =>
              this.domain.site.hasUncompletedWork(site, workerSpecialty));
            break;
          }

        }

        if (site) {
          console.info(`${worker.name} do work on ${site.domain}, because his specialty is ${Specialty[workerSpecialty]}!`);
          await this.domain.worker.doWork(worker, site);
        }
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.canLevelUp(site)) {
        console.info(`Reached new level ${site.level + 1} for ${site.domain}!`);
        await this.domain.site.levelUp(site);
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (
        !this.domain.site.hasActivedContent(site) &&
        this.domain.site.hasDisabledContent(site)
      ) {
        const [ content ] = this.domain.site.getDisabledContents(site);
        console.info(`Enable ${content.contenttypeId} content for ${site.domain}!`);
        await this.domain.site.enableContent(site, content);
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.getAdsCount(site) === 3) {
        for (const ad of this.domain.site.getDisabledAds(site)) {
          await this.domain.site.enableAd(site, ad);
        }

        // const ads = this.domain.site.getAds(site).map((ad) => ({
        //   ...ad, ...this.domain.ad.getAdStats(site, ad) })
        // ).sort((a, b) => a.profitPerHour - b.profitPerHour);
        //
        // const total = ads.map((a) => a.profitPerHour).reduce((s, a) => s + a, 0);
        //
        // if (total < 10) {
        //   const [ad] = ads;
        //   console.info({ profitPerHour: ad.profitPerHour });
        //   if (ad.profitPerHour < 5 || ad.importunity === 100) {
        //     await this.domain.ad.delete(ad);
        //   }
        // } else {
        //   if (site.hostingId < 2) {
        //     await this.domain.site.changeHosting(site, 2);
        //   }
        // }
      }

      if (this.domain.site.getAdsCount(site) < 3) {
        if (!this.domain.site.hasFindAdTask(site)) {
          await this.domain.site.researchAd(site);
        }
      }
    }
  }
}
