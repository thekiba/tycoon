import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse } from '../interfaces';

interface LoginAction extends Action {
  target: 'login';
}
@injectable()
export class LoginActionProcessor extends ActionProcessor<LoginAction> {
  isForActionType(action: Action): action is LoginAction {
    return action.target === 'login';
  }

  onProcessAction(state: InitResponse, action: LoginAction): InitResponse {
    return state;
  }
}
