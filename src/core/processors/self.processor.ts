import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Person } from '../interfaces';

interface SelfAction extends Action<Person> {
  target: 'self';
}

@injectable()
export class SelfActionProcessor extends ActionProcessor<SelfAction> {
  isForActionType(action: Action): action is SelfAction {
    return action.target === 'self';
  }

  onProcessAction(state: InitResponse, action: SelfAction): InitResponse {
    switch (action.action) {

      case 'update': {
        Object.assign(state.person, action.value);
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
