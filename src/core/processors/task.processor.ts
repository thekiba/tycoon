import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Task } from '../interfaces';
import produce from "immer";

interface TaskAddAction extends Action<Task> {
  target: 'task';
  action: 'add';
}
interface TaskUpdateAction extends Action<{
  cancelWorkerFromTask: boolean;
  taskFinish: boolean;
  status: 3;
}> {
  target: 'task';
  action: 'update';
}
type TaskAction = TaskAddAction | TaskUpdateAction;
@injectable()
export class TaskAddActionProcessor extends ActionProcessor<TaskAction> {
  isForActionType(action: Action): action is TaskAction {
    return action.target === 'task';
  }

  onProcessAction(state: InitResponse, action: Action): InitResponse {
    return produce(state, (state) => {
      switch (action.action) {
        case 'add':
          state.tasks.push(action.value);
          break;
        case 'update':
          if (action.value.status === 3) {
            state.tasks = state.tasks.filter((task) => task.id !== action.id);
          } else {
            console.trace(`Unknown action ${JSON.stringify(action)}`);
          }
        default:
          console.trace(`Unknown action ${JSON.stringify(action)}`);
          break;
      }
    });
  }
}

function unknownAction(action: Action) {
  console.trace(`Unknown action ${JSON.stringify(action)}`);
}
