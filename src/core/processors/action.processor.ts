import { injectable } from 'inversify';
import { InitResponse } from '../interfaces';
import { Action } from '../api';

export { Action } from '../api';

@injectable()
export abstract class ActionProcessor<T extends Action> {
  abstract isForActionType(action: Action): action is T;

  abstract onProcessAction(state: InitResponse, action: Action): InitResponse;
}
