import { inject, injectable } from 'inversify';
import { Api, ApiConfig } from '../api';
import { InitResponse } from '../interfaces';
import { AdService, ContentService, SiteService, StateService, TasksService, WorkerService } from './domains';

export class DomainConfig extends ApiConfig {
  author: string;
  game: string;
}

@injectable()
export class DomainService {

  constructor(
    @inject(DomainConfig) private config: DomainConfig,
    @inject(Api) readonly api: Api,
    @inject(StateService) readonly state: StateService,
    @inject(ContentService) readonly content: ContentService,
    @inject(AdService) readonly ad: AdService,
    @inject(SiteService) readonly site: SiteService,
    @inject(TasksService) readonly task: TasksService,
    @inject(WorkerService) readonly worker: WorkerService
  ) {}

  async init(): Promise<InitResponse> {
    return await this.state.init();
  }

}
