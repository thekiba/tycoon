import { DomainConfig, DomainService, Game, GameBehavior, InitResponse, Site, Specialty } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({
  author: 'thekiba',
  name: 'create-sites'
})
@injectable()
export class CreateSitesGame implements GameBehavior {

  state: InitResponse;

  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async start(): Promise<void> {
    this.state = this.domain.state.state;

    for (const site of this.domain.site.getSortedSites()) {
      if (this.domain.site.getAdsCount(site) < 3 && site.level > 0) {
        if (!this.domain.site.hasFindAdTask(site)) {
          console.log(`Research ad on ${site.domain}`);
          await this.domain.site.researchAd(site);
        }
      }

      for (const ad of this.domain.site.getDisabledAds(site)) {
        console.log(`Enable ad on ${site.domain}`);
        await this.domain.site.enableAd(site, ad);
      }
    }

    {
      let site: Site;
      const [ lastSite ] = this.state.sites.sort((a, b) => b.level - a.level);
      if (lastSite.level === 0 || this.state.sites.length === 50) {
        site = lastSite;
      } else {
        const domain = `${ this.config.sitePrefix }${ this.state.sites.length + 1 }${ this.config.sitePostfix }.free`;
        console.log(`Create new site ${domain}`);
        site = await this.domain.api.createSite(domain) as any;
        this.state.sites.push({ ...site, progress: { backend: 0, marketing: 0, design: 0, frontend: 0, ts: 0 } });
      }
    }

    for (const worker of this.domain.worker.getAll()) {
      if (this.domain.worker.isWorking(worker)) {
        if (this.domain.worker.isWorkCompleted(worker)) {
          console.log(`Worker completes work!`);
          await this.domain.worker.completeWork(worker);
        }
      }
    }

    let workers = [];
    for (const site of this.domain.site.getAll()) {
      if (site.level > 0) {
        continue;
      }
      for (const specialty of [ Specialty.backend, Specialty.frontend, Specialty.design ]) {
        if (this.domain.site.hasUncompletedWork(site, specialty)) {
          let availableWorker = this.domain.worker.getAvailableWorkerBySpecialty(specialty);

          if (availableWorker && !workers.includes(availableWorker.id)) {
            console.log(`Go to work ${Specialty[specialty]} for site ${site.domain}`);
            workers.push(availableWorker.id);
            await this.domain.worker.doWork(availableWorker, site);
          }
        }
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.canLevelUp(site)) {
        console.info(`Reached new level ${site.level + 1} for ${site.domain}!`);
        await this.domain.site.levelUp(site);
      }
    }
  }

}
