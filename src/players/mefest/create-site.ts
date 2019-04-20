import { Api, DomainConfig, DomainService, Game, GameBehavior } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({author: 'mefest', name: 'create-site'})

@injectable()

export class CreateSiteGame implements GameBehavior{
    constructor(
        @inject(Api) private api: Api,
        @inject(DomainService) private domain: DomainService,
        @inject(DomainConfig) readonly config: DomainConfig,
    ){

    }
    async start(): Promise<void> {

        let sites = this.domain.site.getAll();

        for(let i = sites.length; i < 50; i++){
            await this.domain.site.createSite(this.config.sitePrefix + i + this.config.sitePostfix)
        }

        return undefined;
    }

}
