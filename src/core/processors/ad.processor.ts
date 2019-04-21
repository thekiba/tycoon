import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Ad } from '../interfaces';

interface AdAction extends Action<Ad> {
  target: 'ad';
}
@injectable()
export class AdActionProcessor extends ActionProcessor<AdAction> {
  isForActionType(action: Action): action is AdAction {
    return action.target === 'ad';
  }

  onProcessAction(state: InitResponse, action: AdAction): InitResponse {
    switch (action.action) {

      case 'update': {
        for (const site of state.sites) {
          for (const ad of site.ad) {
            if (ad.id === action.id) {
              Object.assign(ad, action.value);
              break;
            }
          }
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
}
