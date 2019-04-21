import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Task } from '../interfaces';

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
export class TaskActionProcessor extends ActionProcessor<TaskAction> {
  isForActionType(action: Action): action is TaskAction {
    return action.target === 'task';
  }

  onProcessAction(state: InitResponse, action: TaskAction): InitResponse {
    switch (action.action) {

      case 'add': {
        state.tasks.push(action.value);
        break;
      }

      case 'update': {
        if (action.value.status === 3) {
          state.tasks = state.tasks.filter((task) => task.id !== action.id);
        } else {
          unknownAction(action);
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

