import { Container } from 'inversify';
import { ActionProcessor } from './action.processor';
import { ConnectionActionProcessor } from './connection.processor';
import { PingActionProcessor } from './ping.processor';

const processors: { new (...args: any[]): ActionProcessor<any> }[] =
  [ PingActionProcessor,
    ConnectionActionProcessor ];

export function containerModule(container: Container): void {
  for (const processor of processors) {
    container.bind(ActionProcessor).to(processor);
  }
}
