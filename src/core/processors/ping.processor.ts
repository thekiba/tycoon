import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse } from '../interfaces';

interface PingAction extends Action {
  target: 'ping';
}
@injectable()
export class PingActionProcessor extends ActionProcessor<PingAction> {
  isForActionType(action: Action): action is PingAction {
    return action.target === 'ping';
  }

  onProcessAction(state: InitResponse, action: Action): InitResponse {
    return state;
  }
}
