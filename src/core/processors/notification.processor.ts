import { unknownAction } from '../utils';
import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse, Notification } from '../interfaces';

interface NotificationAction extends Action<Notification> {
  target: 'notification';
}

@injectable()
export class NotificationActionProcessor extends ActionProcessor<NotificationAction> {
  isForActionType(action: Action): action is NotificationAction {
    return action.target === 'notification';
  }

  onProcessAction(state: InitResponse, action: NotificationAction): InitResponse {
    switch (action.action) {

      case 'add': {
        state.notifications.push(action.value);
        break;
      }

      case 'delete': {
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.value.id);
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
