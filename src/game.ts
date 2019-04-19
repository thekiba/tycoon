import { inject, injectable } from 'inversify';
import { DomainConfig, DomainService, getContainer, InitResponse, Site, Specialty } from './services';
import { ApiConfig } from './services/api/api';
import { sleep } from './utils';
import { options } from '../config';

@injectable()
export class Game {
  state: InitResponse;
  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async createSites(): Promise<void> {
    this.state = await this.domain.init();

    for (const site of this.domain.site.getSortedSites()) {
      if (this.domain.site.getAdsCount(site) < 3 && site.level > 0) {
        if (!this.domain.site.hasFindAdTask(site)) {
          await this.domain.site.researchAd(site);
        }
      }

      for (const ad of this.domain.site.getDisabledAds(site)) {
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
        site = await this.domain.api.createSite(domain) as any;
        this.state.sites.push(site);
      }
    }

    for (const worker of this.domain.worker.getAll()) {
      if (this.domain.worker.isWorking(worker)) {
        if (this.domain.worker.isWorkCompleted(worker)) {
          await this.domain.worker.completeWork(worker);
        }
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (site.level > 0) {
        continue;
      }
      for (const specialty of [ Specialty.backend, Specialty.frontend, Specialty.design ]) {
        if (this.domain.site.hasUncompletedWork(site, specialty)) {
          const availableWorker = this.domain.worker.getAvailableWorkerBySpecialty(specialty);
          if (availableWorker) {
            await this.domain.worker.doWork(availableWorker, site);
          }
        }
      }
    }

    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.canLevelUp(site)) {
        await this.domain.site.levelUp(site);
      }
    }
  }

  async startLevelUp(): Promise<void> {
    this.state = await this.domain.init();
    console.log(`
      Balance: ${this.state.person.balanceUsd}\$
      Level:   ${this.state.person.level}
      Exp:     ${this.state.person.score} of ${this.state.person.nextScore}
    `);

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
              this.domain.site.getSortedSitesByProfitPerUser()
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

  async createLinks(): Promise<void> {
    this.state = await this.domain.init();

    for (const site of this.state.sites.filter((site) => site.domain !== this.config.mainDomain)) {
      if (!site.links.some((link) => link.toDomain === this.config.mainDomain)) {
        await this.domain.api.addLinkByDomain(site, this.config.mainDomain);
      }

      if (site.links.filter((link) => link.fromDomain === site.domain).length < 5) {
        const index = this.state.sites.findIndex((s) => site === s);
        const sites = [ ...this.state.sites, ...this.state.sites ].slice(index + 1, index + 1 + 4);
        for (const to of sites) {
          await this.domain.api.addLink(site, to);
        }
      }
    }
  }
}

(async () => {
  const container = getContainer();
  container.bind(DomainConfig).toConstantValue(options);
  container.bind(ApiConfig).toConstantValue(options);
  container.bind(Game).toSelf();

  while (true) {
    try {
      const game = container.get(Game);

      // await game.createSites();
      // await sleep(10000);

      await game.startLevelUp();
      await sleep(10000);

      // await game.createLinks();
      // return;
    } catch (e) {
      console.error(e);
      console.info('Restart after 2 minutes');
      await sleep(120000);
    }
  }
})();
