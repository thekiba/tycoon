import { Container } from 'inversify';
import { ApiConfig, containerModule as apiModule } from './api';
import { CancellationToken } from './cancellation.token';
import { containerModule as gameModule } from './games';
import { containerModule as processorsModule } from './processors';
import { containerModule as servicesModule, DomainConfig } from './services';

export * from './enums';
export * from './interfaces';
export * from './utils';

export { Api, ApiConfig } from './api';
export { GameBehavior, GameRunner, Game } from './games';
export { DomainService, DomainConfig } from './services';
export { CancellationToken } from './cancellation.token';

export function containerModule(container: Container, options: DomainConfig, cancellationToken: CancellationToken): void {
  container.bind(DomainConfig).toConstantValue(options);
  container.bind(ApiConfig).toConstantValue(options);
  container.bind(CancellationToken).toConstantValue(cancellationToken);

  apiModule(container);
  gameModule(container);
  processorsModule(container);
  servicesModule(container);
}
