import { Container } from 'inversify';
import { ActionProcessor } from './action.processor';
import { AdActionProcessor } from './ad.processor';
import { ChatActionProcessor } from './chat.processor';
import { ConnectionActionProcessor } from './connection.processor';
import { ContentActionProcessor } from './content.processor';
import { LoginActionProcessor } from './login.processor';
import { NotificationActionProcessor } from './notification.processor';
import { PingActionProcessor } from './ping.processor';
import { SelfActionProcessor } from './self.processor';
import { SiteActionProcessor } from './site.processor';
import { TaskActionProcessor } from './task.processor';
import { WorkerActionProcessor } from './worker.processor';

const processors: { new (...args: any[]): ActionProcessor<any> }[] =
  [
    AdActionProcessor,
    ChatActionProcessor,
    ConnectionActionProcessor,
    ContentActionProcessor,
    LoginActionProcessor,
    NotificationActionProcessor,
    PingActionProcessor,
    SelfActionProcessor,
    SiteActionProcessor,
    TaskActionProcessor,
    WorkerActionProcessor
  ];

export function containerModule(container: Container): void {
  for (const processor of processors) {
    container.bind(ActionProcessor).to(processor);
  }
}
