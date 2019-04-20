import { Container } from 'inversify';
import { Api } from './api';
import { WebsocketService } from './websocket.service';

export * from './api';
export * from './websocket.service';

const services: { new (...args: any[]): any }[] =
  [ Api,
    WebsocketService ];

export function containerModule(container: Container): void {
  for (const service of services) {
    container.bind(service).toSelf().inSingletonScope();
  }
}
