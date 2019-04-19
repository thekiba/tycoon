import { Container } from 'inversify';
import { Api } from './api/api';
import { DomainService } from './domain.service';
import { AdService, ContentService, SiteService, StateService, TasksService, WorkerService } from './domains';

export * from './enums';
export * from './interfaces';
export * from './domain.service';

export function containerModule(container: Container): void {
  container.bind(Api).toSelf().inSingletonScope();
  container.bind(SiteService).toSelf().inSingletonScope();
  container.bind(AdService).toSelf().inSingletonScope();
  container.bind(ContentService).toSelf().inSingletonScope();
  container.bind(StateService).toSelf().inSingletonScope();
  container.bind(TasksService).toSelf().inSingletonScope();
  container.bind(WorkerService).toSelf().inSingletonScope();
  container.bind(DomainService).toSelf().inSingletonScope();
}
