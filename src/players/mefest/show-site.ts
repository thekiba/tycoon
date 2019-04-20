import { Api, DomainService, Game, GameBehavior } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({author: 'mefest', name: 'show-site'})

@injectable()

export class ShowSiteGame implements GameBehavior{
    constructor(@inject(Api) private api: Api, @inject(DomainService) private domain: DomainService){

    }
    async start(): Promise<void> {
        await this.domain.init();
        for (const site of this.domain.site.getAll()){
            console.log(site.domain);
        }
        return undefined;
    }

}
