import { requires } from '../../utils';
import { inject, injectable } from 'inversify';
import { Api, ApiConfig } from '../../api';
import { InitResponse } from '../../interfaces';

@injectable()
export class StateService {
  state: InitResponse;

  constructor(
    @inject(Api) private api: Api,
    @inject(ApiConfig) private config: ApiConfig
  ) {}

  async init(): Promise<InitResponse> {
    requires(!this.state, new TypeError(`Already initialized!`));
    this.state = await this.api.init();
    return this.state;
  }

  clear(): void {
    this.state = undefined;
  }
}
