import { AdDataService } from '../data';
import { unknownAction } from '../utils';
import { inject, injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Ad } from '../interfaces';

interface AdExtraAction extends Action<Ad> {
  target: 'ad';
}
@injectable()
export class AdExtraActionProcessor extends ActionProcessor<AdExtraAction> {
  constructor(@inject(AdDataService) private adDataService: AdDataService) {
    super();
  }

  isForActionType(action: Action): action is AdExtraAction {
    return action.target === 'ad';
  }

  onProcessAction(state: InitResponse, action: AdExtraAction): InitResponse {
    switch (action.action) {

      case 'add': {
        // action = { ...action, value: { ...action, ...action.value } };
        if (this.isExtraAd(state, action.value)) {
          console.info(`Found new ad ${action.value.id}`);
          if (!action.value.id) {
            console.warn(`Undefined id for ad!`);
            console.warn(action);
          }
          this.adDataService.createAd(action.value);
        }
        break;
      }

      case 'update': {
        action = { ...action, value: { ...action, ...action.value } };
        if ((action as any).status === 1 || (action as any).value.status === 1) {
            console.info(`Deleted ad ${action.value.id}`);
            if (!action.value.id) {
              console.warn(`Undefined id for ad!`);
              console.warn(action);
            }
            this.adDataService.deleteAd(action.value);
        }
        // if (this.isExtraAd(state, action as any)) {
        //   console.info(`Updated ad ${action.value.id}`);
        //   if (!action.value.id) {
        //     console.warn(`Undefined id for ad!`);
        //     console.warn(action);
        //   }
        //   this.adDataService.updateAd(action.value);
        // } else {
        //   console.info(`Deleted ad ${action.value.id}`);
        //   if (!action.value.id) {
        //     console.warn(`Undefined id for ad!`);
        //     console.warn(action);
        //   }
        //   this.adDataService.deleteAd(action.value);
        // }
        break;
      }

      case 'delete': {
        action = { ...action, value: { ...action, ...action.value } };
        if (this.isExtraAd(state, action.value)) {
          console.info(`Deleted ad ${action.value.id}`);
          if (!action.value.id) {
            console.warn(`Undefined id for ad!`);
            console.warn(action);
          }
          this.adDataService.deleteAd(action.value);
        }
        break;
      }

      default: {
        unknownAction(action);
        break;
      }

    }
    return state;
  }

  private isExtraAd(state: InitResponse, ad: Ad): boolean {
    const siteIds = state.sites.map((s) => s.id);
    return !siteIds.includes(ad.siteId);
  }
}
