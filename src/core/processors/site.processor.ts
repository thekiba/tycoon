import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Site, Sitespeed } from '../interfaces';

interface SiteAction extends Action<Site> {
  target: 'site';
}
interface SitePushAction extends Action<Sitespeed> {
  target: 'push';
}
type SiteActions = SiteAction & SitePushAction;
@injectable()
export class SiteActionProcessor extends ActionProcessor<SiteActions> {
  isForActionType(action: Action): action is SiteActions {
    return action.target === 'site';
  }

  onProcessAction(state: InitResponse, action: SiteActions): InitResponse {
    switch (action.action) {

      case 'update': {
        for (const site of state.sites) {
            if (site.id === action.id) {
              Object.assign(site, action.value);
              break;
            }
        }
        break;
      }

      case 'push': {
        for (const site of state.sites) {
          if (site.id === action.id) {
            site.sitespeed.shift();
            site.sitespeed.push(action.value);
            break;
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
