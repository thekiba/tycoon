import { inject, injectable } from 'inversify';
import { requires } from '../../utils';
import { Api, ApiConfig } from '../api/api';
import { InitResponse, Site, Task } from '../interfaces';
import { SiteService } from './site.service';
import { StateService } from './state.service';

@injectable()
export class TasksService {
  get state(): InitResponse {
    return this.stateService.state;
  }

  set state(state: InitResponse) {
    this.stateService.state = state;
  }

  constructor(
    @inject(Api) private api: Api,
    @inject(ApiConfig) private config: ApiConfig,
    @inject(StateService) private stateService: StateService,
    @inject(SiteService) private siteService: SiteService
  ) {}

  getTasks(): Task[] {
    return this.state.tasks;
  }

  getSite(task: Task): Site {
    requires(task, new RangeError('task'));

    return this.siteService.find(task.siteId);
  }

  async cancelTask(task: Task): Promise<InitResponse> {
    requires(task, new RangeError('task'));

    await this.api.cancelTask(task);
    return this.state = { ...this.state, tasks: this.getTasks().filter((t) => t.id !== task.id) };
  }
}
