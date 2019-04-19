import { Container } from 'inversify';
import { containerModule as gameRunner } from './helpers';
import { containerModule as mefest } from './mefest';
import { containerModule as thekiba } from './thekiba';

export * from './helpers/game.runner';

export function containerModule(container: Container): void {
  gameRunner(container);

  mefest(container);
  thekiba(container);
}
