import { DomainConfig, DomainService, Game, GameBehavior, InitResponse } from '@tycoon/core';
import { inject, injectable } from 'inversify';

@Game({
  author: 'thekiba',
  name: 'create-links'
})
@injectable()
export class CreateLinksGame implements GameBehavior {
  state: InitResponse;
  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async start(): Promise<void> {
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
