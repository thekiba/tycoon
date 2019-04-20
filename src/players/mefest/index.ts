import { GameBehavior } from '@tycoon/core';
import { Container } from 'inversify';
import { CreateSiteGame } from './create-site';
import { LevelUpSiteGame } from './levelUp-site';
import { ShowSiteGame } from './show-site';

export function containerModule(container: Container): void {
    container.bind(GameBehavior).to(ShowSiteGame);
    container.bind(GameBehavior).to(CreateSiteGame);
    container.bind(GameBehavior).to(LevelUpSiteGame);
}
