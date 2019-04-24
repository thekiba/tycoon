import { Container } from 'inversify';
import { ApiConfig, containerModule as apiModule } from './api';
import { CancellationToken } from './cancellation.token';
import { DomainConfig } from './config';
import { containerModule as dataModule } from './data';
import { containerModule as gameModule } from './games';
import { containerModule as processorsModule } from './processors';
import { containerModule as servicesModule } from './services';

export * from './enums';
export * from './interfaces';
export * from './utils';

export { Api, ApiConfig } from './api';
export { DomainConfig } from './config';
export { GameBehavior, GameRunner, Game } from './games';
export { DomainService } from './services';
export { CancellationToken } from './cancellation.token';

export function containerModule(container: Container, options: DomainConfig, cancellationToken: CancellationToken): void {
  container.bind(DomainConfig).toConstantValue(options);
  container.bind(ApiConfig).toConstantValue(options);
  container.bind(CancellationToken).toConstantValue(cancellationToken);

  apiModule(container);
  dataModule(container);
  gameModule(container);
  processorsModule(container);
  servicesModule(container);
}
