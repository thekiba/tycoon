import { inject, injectable } from 'inversify';
import { Helpers, requires } from '../../utils';
import { Api, ApiConfig } from '../../api';
import { Ad, InitResponse, Site } from '../../interfaces';
import { StateService } from './state.service';

export interface AdStat {
  profitTotal: number;
  profitPerHour: number;
  conversion: number;
}

@injectable()
export class AdService {
  get state(): InitResponse {
    return this.stateService.state;
  }

  set state(state: InitResponse) {
    this.stateService.state = state;
  }

  constructor(
    @inject(Api) private api: Api,
    @inject(ApiConfig) private config: ApiConfig,
    @inject(StateService) private stateService: StateService
  ) {}

  isEnabled(ad: Ad): boolean {
    requires(ad, new RangeError('ad'));

    return ad.status === 1;
  }

  isDisabled(ad: Ad): boolean {
    requires(ad, new RangeError('ad'));

    return ad.status === 0;
  }

  getAdStats(site: Site, ad: Ad): AdStat {
    requires(site, new RangeError('site'));
    requires(ad, new RangeError('ad'));

    return adData(site, ad);
  }

  async delete(ad: Ad): Promise<InitResponse> {
    requires(ad, new RangeError('ad'));

    await this.api.deleteAd(ad);
    const site = this.state.sites.find((site) => site.id === ad.siteId);
    return this.state = {
      ...this.state,
      sites: [
        ...this.state.sites.filter((site) => site.id !== ad.siteId),
        {
          ...site,
          ad: site.ad.filter((a) => a.id !== ad.id)
        }
      ]
    };
  }
}

function formatMoney(e) {
  const money = e >= 100 ? Math.floor(e) : e;
  return parseFloat(money.toFixed(2));
}

function adData(site: Site, ad: Ad) {
  const [ lastSpeed ] = site.sitespeed.reverse();
  const bS = new Date().getTime();
  var moneyEarned = ad.money
    , ctrBase = ad.ctrBase
    , ctrVector = ad.ctrVector
    , startDate = ad.startDate
    , cpc = ad.cpc
    , moneyEarned = moneyEarned || 0
    , r = {
    profitTotal: Math.max(formatMoney(moneyEarned / 100)),
    profitPerHour: 0,
    conversion: 0
  };

  var o = {
    ctrBase: ctrBase,
    ctrVector: ctrVector,
    startDate: startDate,
    cpc: cpc
  };
  var c = Helpers.Money.calcMoneyAmountOne(lastSpeed, o, Math.max(bS, lastSpeed.ts));
  let result = {
    profitTotal: Math.max(formatMoney((moneyEarned + c) / 100), 0),
    profitPerHour: formatMoney(Helpers.Money.calcMoneySpeedOne(lastSpeed, o, bS) / 100),
    conversion: Helpers.Money.calcCurrentCTR(o, Math.max(bS, 1e3 * startDate)) * Helpers.Money.calcAnnoRatio(lastSpeed.anno)
  };
  return result;
};
