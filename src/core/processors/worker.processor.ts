import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Worker } from '../interfaces';

interface WorkerAction extends Action<Worker> {
  target: 'worker';
}
@injectable()
export class WorkerActionProcessor extends ActionProcessor<WorkerAction> {
  isForActionType(action: Action): action is WorkerAction {
    return action.target === 'worker';
  }

  onProcessAction(state: InitResponse, action: WorkerAction): InitResponse {
    switch (action.action) {

      case 'update': {
        for (const worker of state.workers) {
            if (worker.id === action.id) {
              Object.assign(worker, action.value);
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
