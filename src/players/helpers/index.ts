import { interfaces } from 'inversify';
import Container = interfaces.Container;

import { GameRunner } from './game.runner';

export * from './game.behavior';
export * from './game.decorator';
export * from './game.runner';

export function containerModule(container: Container): void {
  container.bind(GameRunner).toSelf();
}
