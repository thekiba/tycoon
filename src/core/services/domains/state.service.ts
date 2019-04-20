import { requires } from '../../utils';
import { inject, injectable } from 'inversify';
import { Api, ApiConfig, WebsocketService } from '../../api';
import { InitResponse } from '../../interfaces';

@injectable()
export class StateService {
  state: InitResponse;

  constructor(
    @inject(Api) private api: Api,
    @inject(WebsocketService) private ws: WebsocketService,
    @inject(ApiConfig) private config: ApiConfig
  ) {}

  async init(ws?: boolean): Promise<InitResponse> {
    requires(!this.state, new TypeError(`Already initialized!`));
    this.state = await this.api.init();
    if (ws) {
      await this.ws.init({
        getState: () => this.state,
        setState: (state: InitResponse) => this.state = state
      });
    }
    return this.state;
  }

  clear(): void {
    this.state = undefined;
  }
}
