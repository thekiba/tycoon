import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Content } from '../interfaces';

interface ContentAction extends Action<Content> {
  target: 'content';
}
@injectable()
export class ContentActionProcessor extends ActionProcessor<ContentAction> {
  isForActionType(action: Action): action is ContentAction {
    return action.target === 'content';
  }

  onProcessAction(state: InitResponse, action: ContentAction): InitResponse {
    switch (action.action) {

      case 'update': {
        for (const site of state.sites) {
          for (const content of site.content) {
            if (content.id === action.id) {
              Object.assign(content, action.value);
              break;
            }
          }
        }
        break;
      }

      case 'delete': {
        for (const site of state.sites) {
          site.content = site.content.filter((content) =>
            content.id !== action.value.id);
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
