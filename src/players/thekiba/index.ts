import { GameBehavior } from '@tycoon/core';
import { Container } from 'inversify';
import { CreateLinksGame } from './create-links';
import { CreateSitesGame } from './create-sites';
import { SandboxGame } from './sandbox';
import { StartLevelUpGame } from './start-level-up';

const behaviors: { new (...args: any[]): GameBehavior }[] =
  [ CreateSitesGame,
    CreateLinksGame,
    StartLevelUpGame,
    SandboxGame ];

export function containerModule(container: Container): void {
  for (const behavior of behaviors) {
    container.bind(GameBehavior).to(behavior);
  }
}
