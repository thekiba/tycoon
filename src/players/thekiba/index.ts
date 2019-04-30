import { GameBehavior } from '@tycoon/core';
import { Container } from 'inversify';
import { CreateLinksGame } from './create-links';
import { CreateSitesGame } from './create-sites';
import { FindAdsGame } from './find-ads';
import { SandboxGame } from './sandbox';
import { StartLevelUpGame } from './start-level-up';
import { UpdateAdsGame } from './update-ads';
import { WatchAdsGame } from './watch-ads';

const behaviors: { new (...args: any[]): GameBehavior }[] =
  [ CreateSitesGame,
    CreateLinksGame,
    StartLevelUpGame,
    SandboxGame,
    FindAdsGame,
    UpdateAdsGame,
    WatchAdsGame];

export function containerModule(container: Container): void {
  for (const behavior of behaviors) {
    container.bind(GameBehavior).to(behavior);
  }
}
