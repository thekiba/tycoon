import { injectable } from 'inversify';
import { Action, ActionProcessor } from './action.processor';
import { InitResponse } from '../interfaces';

interface ChatAction extends Action {
  target: 'globalchat' | 'itTalksChat' | 'linksExchangeChat' | 'globalpool';
}
@injectable()
export class ChatActionProcessor extends ActionProcessor<ChatAction> {
  isForActionType(action: Action): action is ChatAction {
    return ['globalchat', 'itTalksChat', 'linksExchangeChat', 'globalpool'].includes(action.target);
  }

  onProcessAction(state: InitResponse, action: ChatAction): InitResponse {
    return state;
  }
}
