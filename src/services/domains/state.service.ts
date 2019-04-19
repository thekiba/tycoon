import { inject, injectable } from 'inversify';
import { Api, ApiConfig } from '../api/api';
import { InitResponse } from '../interfaces';

@injectable()
export class StateService {
  state: InitResponse;

  constructor(
    @inject(Api) private api: Api,
    @inject(ApiConfig) private config: ApiConfig
  ) {}

  async init(): Promise<InitResponse> {
    return this.state = await this.api.init();
  }
}
