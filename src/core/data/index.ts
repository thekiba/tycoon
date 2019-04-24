import { Container } from 'inversify';
import { AdDataService } from './ad.data';

export * from './ad.data';

const services: { new (...args: any[]): any }[] =
  [ AdDataService ];

export function containerModule(container: Container): void {
  for (const service of services) {
    container.bind(service).toSelf().inSingletonScope();
  }
}
