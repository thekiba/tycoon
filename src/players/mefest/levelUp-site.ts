import { Ad, Api, DomainConfig, DomainService, Game, GameBehavior, Site, Specialty } from '@tycoon/core';
import { inject, injectable } from 'inversify';

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
     * Удаление рекламы
     */
    // for (const site of this.domain.site.getAll()) {
    //   if(this.domain.site.getEnabledAds(site).length == 3 && site.id == '5cb32ad0f9a8a21c22dcc4f5'){
    //
    //     const ads = this.domain.site.getEnabledAds(site);
    //     let adS = [
    //       {'ad': ads[0], 'pph': this.domain.ad.getAdStats(site, ads[0]).profitPerHour },
    //       {'ad': ads[1], 'pph': this.domain.ad.getAdStats(site, ads[1]).profitPerHour },
    //       {'ad': ads[2], 'pph': this.domain.ad.getAdStats(site, ads[2]).profitPerHour },
    //     ];
    //
    //     console.log(adS);
    //     //   let ads = this.domain.site.getEnabledAds(site).sort( (a: Ad, b: Ad) =>{
    //     //     console.log(a.id,  this.domain.ad.getAdStats(site, a).profitPerHour);
    //     //     console.log(b.id, this.domain.ad.getAdStats(site, b).profitPerHour);
    //     //     console.log(this.domain.ad.getAdStats(site, a).profitPerHour - this.domain.ad.getAdStats(site, b).profitPerHour);
    //     //     return this.domain.ad.getAdStats(site, a).profitPerHour - this.domain.ad.getAdStats(site, b).profitPerHour; });
    //     //   // console.log(ads);
    //     //
    //   }
    // }

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
     * поиск рекламы
     */
    for (const site of this.domain.site.getAll()) {
      if(this.domain.site.getAdsCount(site) < 3 && site.level > 0){
        await this.domain.site.researchAd(site);
        console.log(`Поиск рекламы на ${site.domain}`);
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
      let task = this.domain.worker.getTask(worker);
      if(worker.energyValue <= 5){
        await this.domain.worker.sendVacation(worker);
        console.log(`${worker.name} устал и пошел отдыхать`);
      }
      if(worker.energyValue >= 95){
        if(task && task.zone === 'vacation'){
          await this.domain.worker.cancelVacation(worker);
          console.log(`${worker.name} почти полон сил! Будет играть на следующем ходу`);
        }
      }
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

    /**
     * включение рекламы
     */
    for (const site of this.domain.site.getAll()) {
      for(const ad of this.domain.site.getDisabledAds(site)){
        await this.domain.site.enableAd(site, ad);
      }
    }

    return undefined;
  }

}
