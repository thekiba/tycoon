import { inject, injectable } from 'inversify';
import { Api, WebsocketService } from '../api';
import { DomainConfig } from '../config';
import { AdDataService } from '../data';
import { InitResponse } from '../interfaces';
import { AdService, ContentService, SiteService, StateService, TasksService, UserService, WorkerService } from './domains';


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
    @inject(UserService) readonly user: UserService,
    @inject(WorkerService) readonly worker: WorkerService,
    @inject(AdDataService) readonly adDataService: AdDataService,
    @inject(WebsocketService) private ws: WebsocketService,
  ) {}

  async init(ws?: boolean): Promise<InitResponse> {
    await this.state.init();
    if (ws) {
      await this.ws.init({
        getState: () => this.state.state,
        setState: (state: InitResponse) => this.state.state = state
      });
    }
    await this.adDataService.init();
    return this.state.state;
  }

  clear(): void {
    this.state.clear();
  }

}
