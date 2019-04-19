import { inject, injectable } from 'inversify';
import { Api, ApiConfig} from './api/api';
import { AdService, ContentService, StateService, SiteService, TasksService, WorkerService } from './domains';
import { InitResponse } from './interfaces';

export class DomainConfig extends ApiConfig {}

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
