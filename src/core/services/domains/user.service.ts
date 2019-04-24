import { inject, injectable } from 'inversify';
import { Api, ApiConfig } from '../../api';
import { InitResponse } from '../../interfaces';
import { StateService } from './state.service';

@injectable()
export class UserService {
  get state(): InitResponse {
    return this.stateService.state;
  }

  set state(state: InitResponse) {
    this.stateService.state = state;
  }

  constructor(
    @inject(Api) private api: Api,
    @inject(ApiConfig) private config: ApiConfig,
    @inject(StateService) private stateService: StateService
  ) {}

  async getUserInfo(userId: string): Promise<InitResponse> {
    return this.api.getUserInfo(userId);
  }

}
