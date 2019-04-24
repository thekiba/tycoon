import { Container } from 'inversify';
import { DomainService } from './domain.service';
import { AdService, ContentService, SiteService, StateService, TasksService, UserService, WorkerService } from './domains';

export * from './domain.service';

const services: { new (...args: any[]): any }[] =
  [ SiteService,
    AdService,
    ContentService,
    StateService,
    TasksService,
    UserService,
    WorkerService,
    DomainService ];

export function containerModule(container: Container): void {
  for (const service of services) {
    container.bind(service).toSelf().inSingletonScope();
  }
}
