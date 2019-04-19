import {Game, GameBehavior} from "../helpers";
import {inject, injectable} from "inversify";
import {Api} from "../../services/api/api";
import {DomainConfig, DomainService, Site, Specialty} from "../../services";
import {Ad} from "../../services/interfaces";

@Game({author: 'mefest', name: 'levelUp-site'})

@injectable()

export class LevelUpSiteGame implements GameBehavior{
  constructor(
    @inject(Api) private api: Api,
    @inject(DomainService) private domain: DomainService,
    @inject(DomainConfig) readonly config: DomainConfig,
  ){

  }
  async start(): Promise<void> {

    console.log(`
      Balance: ${(this.domain.state.state.person.balanceUsd / 100).toFixed(2)}\$
      Level:   ${this.domain.state.state.person.level}
      Exp:     ${this.domain.state.state.person.score} of ${this.domain.state.state.person.nextScore}
    `);

    /**
     * прокачка уровня
     */
    for (const site of this.domain.site.getAll()) {
      if (this.domain.site.canLevelUp(site)) {
        await this.domain.site.levelUp(site);
      }
    }
    /**
     * постим контент
     */
    for (const site of this.domain.site.getAll()) {
      if(this.domain.site.hasDisabledContent(site) && !this.domain.site.hasActivedContent(site)){
        const [content] = this.domain.site.getDisabledContents(site);
        await this.domain.site.enableContent(site, content);
      }
    }

    /**
     * поиск и публикация рекламы
     */
    for (const site of this.domain.site.getAll()) {
      if(this.domain.site.getAdsCount(site) < 3 && site.level > 0){
        await this.domain.site.researchAd(site);
        console.log(`Поиск рекламы на ${site.domain}`);
      }
      if(this.domain.site.getEnabledAds(site).length == 3){

        const [ad] = this.domain.site.getEnabledAds(site).sort( (a: Ad, b: Ad) => {
          return this.domain.ad.getAdStats(site, b).profitPerHour -
            this.domain.ad.getAdStats(site, a).profitPerHour;
        });
        await this.domain.ad.delete(ad);
        console.log(`Удаление рекламы на ${site.domain}`);

      }
      for(const ad of this.domain.site.getDisabledAds(site)){
        await this.domain.site.enableAd(site, ad);
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

    for (const worker of this.domain.worker.getAll()) {
      if (this.domain.worker.isIdle(worker)) {
        const workerSpecialty = this.domain.worker.getSpecialty(worker);

        let site: Site;
        switch (workerSpecialty) {

          case Specialty.marketing: {
            site =
              this.domain.site.getSortedSites().find((site) =>
                !this.domain.site.hasContent(site) &&
                site.level > 0
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

    return undefined;
  }

}
