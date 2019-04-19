import { requires } from '../../utils';
import { GameBehavior } from './game.behavior';

const SecretToken = Symbol('Game Config Token');

export interface GameConfig {
  name: string;
  author: string;
}

export function Game(config: GameConfig): ClassDecorator {
  return (target) => {
    requires(config, new RangeError(`Should be defined 'config' for ${target.constructor.name} game.`));
    requires(config.author, new RangeError(`Should be defined 'config.author' for ${target.constructor.name} game.`));
    requires(config.name, new RangeError(`Should be defined 'config.name' for ${target.constructor.name} game.`));

    Reflect.defineMetadata("game:config", config, target, SecretToken);
    return target;
  };
}

export function readGameConfig(target: GameBehavior): GameConfig {
  const config = Reflect.getMetadata("game:config", target.constructor, SecretToken);
  requires(config, new RangeError(`Can't find config for ${target.constructor.name} game.`));

  return config;
}
