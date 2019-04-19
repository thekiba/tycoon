import { inject, injectable } from 'inversify';
import { requires } from '../../utils';
import { Api, ApiConfig } from '../api/api';
import { Specialty } from '../enums';
import { InitResponse, Site, Task, Worker } from '../interfaces';
import { ContentService } from './content.service';
import { SiteService } from './site.service';
import { StateService } from './state.service';
import { TasksService } from './tasks.service';

@injectable()
export class WorkerService {
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
    @inject(TasksService) private task: TasksService,
    @inject(SiteService) private site: SiteService,
    @inject(ContentService) private contentService: ContentService
  ) {}

  getAll(): Worker[] {
    return this.state.workers;
  }

  getSpecialty(worker: Worker): Specialty {
    requires(worker, new RangeError('worker'));

    const selectedWorkerType = Object.entries(worker.limit).reduce((result, [ workerType, workerLevel ]) =>
      workerLevel > result[ 1 ] ? [ workerType, workerLevel ] : result, [ null, 0 ]);
    console.assert(!!selectedWorkerType || !!selectedWorkerType[ 0 ], `Can't fetch worker type of ${ JSON.stringify(worker) }!`);
    return Specialty[ selectedWorkerType[ 0 ] ];
  }

  hasSpecialty(worker: Worker, specialty: Specialty): boolean {
    requires(worker, new RangeError('worker'));
    requires(specialty >= 1 && specialty <= 5, new RangeError('specialty'));

    return this.getSpecialty(worker) === specialty;
  }

  getTask(worker: Worker): Task {
    requires(worker, new RangeError('worker'));

    return this.task.getTasks().find((task) =>
      task && task.workers && task.workers.includes(worker.id));
  }

  getSite(worker: Worker): Site {
    requires(worker, new RangeError('worker'));

    const task = this.getTask(worker);
    if (task) {
      return this.task.getSite(task);
    }
  }

  isWorking(worker: Worker): boolean {
    requires(worker, new RangeError('worker'));

    return !!this.getTask(worker);
  }

  isIdle(worker: Worker): boolean {
    requires(worker, new RangeError('worker'));

    return !this.isWorking(worker);
  }

  async completeWork(worker: Worker): Promise<InitResponse> {
    requires(worker, new RangeError('worker'));

    const task = this.getTask(worker);
    if (task) {
      await this.task.cancelTask(task);
      return this.state = { ...this.state, tasks: this.state.tasks.filter((t) => t.id !== task.id) };
    }
  }

  isWorkCompleted(worker: Worker): boolean {
    requires(worker, new RangeError('worker'));

    let done: boolean;
    const workType = this.getSpecialty(worker);
    switch (workType) {

      case Specialty.design:
      case Specialty.frontend:
      case Specialty.backend: {
        const site = this.getSite(worker);
        if (site) {
          const workName = Specialty[ workType ];
          done = site.progress[ workName ] === site.limit[ workName ];
        }
        break;
      }

      case Specialty.marketing: {
        const site = this.getSite(worker);
        if (site) {
          done = this.site.hasActivedContent(site)
            || this.site.hasDisabledContent(site);
        }
        break;
      }

    }
    return done;
  }

  async doWork(worker: Worker, site: Site): Promise<InitResponse> {
    requires(worker, new RangeError('worker'));
    requires(site, new RangeError('site'));

    const workType = this.getSpecialty(worker);
    const task: Task = await this.api.addWorker(site, [ worker ], workType) as any;
    return this.state = {
      ...this.state,
      tasks: [ ...this.state.tasks, task ]
    };
  }

  getAvailableWorkerBySpecialty(specialty: Specialty): Worker {
    requires(specialty >= 1 && specialty <= 5, new RangeError('specialty'));

    return this.getAll().find((worker) =>
      this.isIdle(worker) && this.hasSpecialty(worker, specialty));
  }
}
