import { inject, injectable, multiInject, optional } from 'inversify';
import * as WebSocket from 'ws';
import { CancellationToken } from '../cancellation.token';
import { InitResponse } from '../interfaces';
import { ActionProcessor } from '../processors/action.processor';
import { ApiConfig } from './api';

export interface Action<T = any> {
  target: string;
  action: string;
  id?: string;
  value: T;
}
interface BatchAction extends Action<Action[]> {
  action: 'batch';
  target: 'batch';
}

@injectable()
export class WebsocketService {
  private getState: () => InitResponse;
  get state(): InitResponse {
    return this.getState();
  }

  private setState: (state: InitResponse) => void;
  set state(state: InitResponse) {
    this.setState(state);
  }

  private ws: WebSocket;

  constructor(
    @inject(ApiConfig) private config: ApiConfig,
    @multiInject(ActionProcessor) @optional() private processors: ActionProcessor<Action>[],
    @inject(CancellationToken) private cancellationToken: CancellationToken
  ) {}

  async init({ getState, setState }: {
    getState: () => InitResponse,
    setState: (state: InitResponse) => void
  }): Promise<InitResponse> {
    this.getState = getState;
    this.setState = setState;

    const ws = this.ws = new WebSocket('wss://api.web-tycoon.com/');

    ws.on('open', () => this.onOpen());
    ws.on('close', () => this.onClose());
    ws.on('message', (message: string) => this.onMessage(JSON.parse(message)));

    this.cancellationToken.finally(() => {
      this.ws.close();
    });

    return undefined;
  }

  private async onOpen(): Promise<void> {
    this.send('login', 'add', this.config.access_token);
  }

  private async onClose(): Promise<void> {
    this.cancellationToken.cancel();
  }

  private onMessage(message: BatchAction | Action): void {
    if (message.action === 'batch') {
      for (const value of message.value) {
        this.onMessage(value);
      }
    } else {
      this.onProcessMessage(message);
    }
    return undefined;
  }

  private onProcessMessage(action: Action): void {
    const processor = this.processors.find(
      (processor) => processor.isForActionType(action));

    if (!processor) {
      return console.log(`Can't find processor for action ${action.target}:${action.action}!`);
    } else {
      this.state = processor.onProcessAction(this.state, action);
    }
  }

  private send<T>(target: string, action: 'add', value: T): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ target, action, value }));
    }
  }
}
