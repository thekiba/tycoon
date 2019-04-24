import { DomainConfig, DomainService, Game, GameBehavior } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({
  author: 'thekiba',
  name: 'find-ads',
  waiting: 2 * 60 * 1000
})
@injectable()
export class FindAdsGame implements GameBehavior {

  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async start(): Promise<void> {
    const [ site ] = this.domain.site.getAll();
    for (const ad of this.domain.ad.getExtraAll().map(
      (a) => this.domain.ad.getAdStats(site, a))) {
      if (ad.importunity > 50) {
        await this.domain.ad.delete(ad);
        continue;
      }

      const [ worstAd ] =
        this.domain.ad.getAllAds(this.domain.site.getAll())
            .map((a) => this.domain.ad.getAdStats(site, a))
            .sort((a, b) => a.profitPerHour - b.profitPerHour);

      if (ad.profitPerHour > worstAd.profitPerHour) {
        const selectedSite = this.domain.site.find(worstAd.siteId);
        console.info(`Remove worst ad with profit \$${worstAd.profitPerHour} for ${selectedSite.domain}!`);
        await this.domain.ad.delete(worstAd);
        console.info(`Enable extra ad with profit \$${ad.profitPerHour} for ${selectedSite.domain}!`);
        await this.domain.site.enableAd(selectedSite, ad);
      } else {
        console.info(`Remove extra ad with profit \$${ad.profitPerHour}!`);
        await this.domain.ad.delete(ad);
      }
    }

    const extraAds = this.domain.ad.getExtraAll();
    const extraAdsIds = extraAds.map((a) => a.siteId);
    for (const site of this.domain.site.getExtraAll()) {
      if (!extraAdsIds.includes(site.id)) {
        console.info(`Starting research ad of site ${site.domain}!`);
        await this.domain.site.researchAd(site);
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.getAdsCount(site) === 3) {
        for (const ad of this.domain.site.getDisabledAds(site)) {
          console.info(`Enable disabled ad for ${site.domain}!`);
          await this.domain.site.enableAd(site, ad);
        }
      }

      if (this.domain.site.getAdsCount(site) < 3) {
        if (!this.domain.site.hasFindAdTask(site)) {
          console.info(`Find ad for own site ${site.domain}!`);
          await this.domain.site.researchAd(site);
        }
      }
    }
  }
}
