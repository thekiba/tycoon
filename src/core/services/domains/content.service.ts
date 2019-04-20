import { inject, injectable } from 'inversify';
import { Api, ApiConfig } from '../../api';
import { Content, InitResponse } from '../../interfaces';
import { StateService } from './state.service';

@injectable()
export class ContentService {
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

  isEnabled(content: Content): boolean {
    const current = new Date().getTime() / 1000;
    return !this.isDisabled(content) && current < (content.ts + content.duration);
  }

  isExpired(content: Content): boolean {
    return content.status === 2;
  }

  isDisabled(content: Content): boolean {
    return content.status === 1;
  }

}
