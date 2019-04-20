import { inject, injectable } from 'inversify';
import { Api, ApiConfig } from '../../api';
import { Specialty } from '../../enums';
import { Ad, Content, CreateSiteResponse, InitResponse, Site, Task } from '../../interfaces';
import { Helpers, requires } from '../../utils';
import { AdService } from './ad.service';
import { ContentService } from './content.service';
import { StateService } from './state.service';

@injectable()
export class SiteService {
  get state(): InitResponse {
    return this.stateService.state;
  }

  set state(state: InitResponse) {
    this.stateService.state = state;
  }

  constructor(
    @inject(Api) private api: Api,
    @inject(ApiConfig) private config: ApiConfig,
    @inject(StateService) private stateService: StateService,
    @inject(AdService) private ad: AdService,
    @inject(ContentService) private content: ContentService
  ) {}

  find(siteId: string): Site {
    return this.state.sites.find((site) => site.id === siteId);
  }

  getAll(): Site[] {
    return this.state.sites;
  }

  hasUncompletedWork(site: Site, specialty: Specialty): boolean {
    requires(site, new RangeError('site'));
    requires(specialty >= 1 && specialty <= 5, new RangeError('specialty'));

    const workName = Specialty[ specialty ];
    return site.progress[ workName ] < site.limit[ workName ];
  }

  createSite(domain: string): Promise<CreateSiteResponse> {
    return this.api.createSite(domain);
  }

  getSortedSites(direction: 'asc' | 'desc' = 'asc', byField: keyof Site = 'level'): Site[] {
    requires([ 'asc', 'desc' ].includes(direction), new RangeError('site'));
    requires(byField, new RangeError('byField'));

    return this.state.sites.sort((a, b) =>
      direction === 'asc' ? a[ byField ] - b[ byField ] : b[ byField ] - a[ byField ]);
  }

  hasActivedContent(site: Site): boolean {
    requires(site, new RangeError('site'));

    return site.content.length > 0
      && site.content.some((content) =>
        this.content.isEnabled(content));
  }

  hasDisabledContent(site: Site): boolean {
    requires(site, new RangeError('site'));

    return site.content.some((content) =>
      this.content.isDisabled(content));
  }

  hasContent(site: Site): boolean {
    return this.hasActivedContent(site) || this.hasDisabledContent(site);
  }

  canLevelUp(site: Site): boolean {
    requires(site, new RangeError('site'));

    return [ Specialty.design, Specialty.frontend, Specialty.backend ]
      .map((specialty: Specialty) => Specialty[ specialty ])
      .every((specialty: string) => site.progress[ specialty ] === site.limit[ specialty ]);
  }

  async levelUp(site: Site): Promise<InitResponse> {
    requires(site, new RangeError('site'));

    await this.api.levelUpSite(site);
    site = {
      ...site, progress: {
        backend: 0,
        frontend: 0,
        design: 0,
        marketing: site.progress.marketing,
        ts: site.progress.ts
      }
    };
    return this.state = {
      ...this.state,
      sites: [ ...this.state.sites.filter((s) => s.id !== site.id), site ]
    };
  }

  async enableContent(site: Site, content: Content): Promise<InitResponse> {
    requires(site, new RangeError('site'));

    await this.api.enableContent(site, content);
    content = { ...content, status: 3, ts: new Date().getTime() / 1000 };
    site = {
      ...site, content: [
        ...site.content.filter((c) => c.id !== content.id),
        content
      ]
    };
    return this.state = {
      ...this.state,
      sites: [ ...this.state.sites.filter((s) => s.id !== site.id), site ]
    };
  }

  getAds(site: Site): Ad[] {
    requires(site, new RangeError('site'));

    return site.ad;
  }

  getAdsCount(site: Site): number {
    requires(site, new RangeError('site'));

    return this.getAds(site).length;
  }

  async researchAd(site: Site): Promise<void> {
    requires(site, new RangeError('site'));

    try {
      await this.api.findAd(site, 0);
    } catch (e) {}
  }

  async enableAd(site: Site, ad: Ad): Promise<void> {
    requires(site, new RangeError('site'));
    requires(ad, new RangeError('ad'));

    await this.api.addAd(ad);
  }

  async changeHosting(site: Site, hosting: 1 | 2 | 3): Promise<void> {
    requires(site, new RangeError('site'));
    requires(hosting >= 1 && hosting <= 5, new RangeError('hosting'));
    requires(hosting > site.hostingId, new RangeError('hosting'));

    await this.api.changeHosting(site, hosting);
  }

  getDisabledAds(site: Site): Ad[] {
    requires(site, new RangeError('site'));

    return this.getAds(site).filter((ad) =>
      this.ad.isDisabled(ad));
  }

  getEnabledAds(site: Site): Ad[] {
    requires(site, new RangeError('site'));

    return this.getAds(site).filter((ad) =>
      this.ad.isEnabled(ad));
  }

  getDisabledContents(site: Site): Content[] {
    requires(site, new RangeError('site'));

    return this.getContents(site).filter((content) =>
      this.content.isDisabled(content));
  }

  private getContents(site: Site): Content[] {
    requires(site, new RangeError('site'));

    return site.content;
  }

  getFindAdTask(site: Site): Task {
    requires(site, new RangeError('site'));

    return this.state.tasks.find((task) =>
      task.zone === 'searchAd' && task.siteId === site.id);
  }

  hasFindAdTask(site: Site): boolean {
    requires(site, new RangeError('site'));

    return !!this.getFindAdTask(site);
  }

  getProfitPerHour(site: Site): number {
    requires(site, new RangeError('site'));

    return this.getEnabledAds(site).reduce((profit, ad) =>
      profit + this.ad.getAdStats(site, ad).profitPerHour, 0);
  }

  getSortedSitesByProfitPerHour(): Site[] {
    return this.getAll().sort((a, b) =>
      this.getProfitPerHour(b) - this.getProfitPerHour(a)
    );
  }

  getTraffic(site: Site): number {
    requires(site, new RangeError('site'));

    const current = new Date().getTime();
    const [ lastSpeed ] = site.sitespeed.reverse();

    return Helpers.Traffic.calcCommunityTraffic(lastSpeed, current)
      + Helpers.Traffic.calcLinkTraffic(lastSpeed, current)
      + Helpers.Traffic.calcGenericTraffic(lastSpeed, current);
  }

  getProfitPerUser(site: Site): number {
    requires(site, new RangeError('site'));

    return this.getProfitPerHour(site) / this.getTraffic(site);
  }

  getSortedSitesByProfitPerUser(): Site[] {
    return this.getAll().sort((a, b) =>
      this.getProfitPerUser(b) - this.getProfitPerUser(a)
    );
  }


  canPayForHosting(site: Site): boolean {
    requires(site, new RangeError('site'));

    const current = new Date().getTime() / 1000;
    const tenHours = 60 * 60 * 10;
    return (current + tenHours) > site.hostingPaidTill;
  }

  canNormalizeSite(site: Site): boolean {
    return !site.kfParam.custom;
  }

  async normalizeSite(site: Site): Promise<InitResponse> {
    requires(site, new RangeError('site'));
    requires(this.canNormalizeSite(site), new RangeError(`Site ${ site.domain } has already normalized!`));

    await this.api.normalizeSite(site);
    return this.state;
  }

  async payForHosting(site: Site): Promise<InitResponse> {
    requires(site, new RangeError('site'));
    requires(this.canPayForHosting(site), new RangeError(`Can't pay for site when till greater than 10 hours!`));

    await this.api.payForHosting(site);
    return this.state = {
      ...this.state,
      person: {
        ...this.state.person,
        balanceUsd: this.state.person.balanceUsd - 35000
      }
    };
  }

}

