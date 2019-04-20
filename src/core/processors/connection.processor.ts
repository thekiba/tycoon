import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse } from '../interfaces';

interface ConnectionAction extends Action {
  target: 'connectionId';
}
@injectable()
export class ConnectionActionProcessor extends ActionProcessor<ConnectionAction> {
  isForActionType(action: Action): action is ConnectionAction {
    return action.target === 'connectionId';
  }

  onProcessAction(state: InitResponse, action: Action): InitResponse {
    return state;
  }
}
