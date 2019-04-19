import { inject, injectable, multiInject } from 'inversify';
import {DomainConfig, DomainService} from '../../services';
import { requires } from '../../utils';
import { GameBehavior } from './game.behavior';
import { readGameConfig } from './game.decorator';

@injectable()
export class GameRunner implements GameBehavior {
  constructor(
    @inject(DomainConfig) private config: DomainConfig,
    @inject(DomainService) private domain: DomainService,
    @multiInject(GameBehavior) private games: GameBehavior[]
  ) {
    requires(config.author, new RangeError(`Should be defined 'config.author' in 'config.ts'.`));
    requires(config.game, new RangeError(`Should be defined 'config.name' in 'config.ts'.`));
  }

  async start(): Promise<void> {
    const game: GameBehavior = this.games.find((game: GameBehavior): boolean => {
      const config = readGameConfig(game);
      return config.author === this.config.author
        && config.name === this.config.game;
    });

    requires(game, new RangeError(`Can't find game for ${this.config.author} and ${this.config.game}.`));
    console.info(`${this.config.author}:${this.config.game} has been started!`);

    await this.domain.init();

    return game.start();
  }
}
