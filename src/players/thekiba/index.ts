import { interfaces } from 'inversify';
import { GameBehavior } from '../helpers';
import { CreateSitesGame } from './create-sites';
import { CreateLinksGame } from './create-links';
import { StartLevelUpGame } from './start-level-up';
import Container = interfaces.Container;

export function containerModule(container: Container): void {
  container.bind(GameBehavior).to(CreateSitesGame);
  container.bind(GameBehavior).to(CreateLinksGame);
  container.bind(GameBehavior).to(StartLevelUpGame);
}
