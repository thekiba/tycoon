import { requires } from '../utils';
import { GameBehavior } from './game.behavior';

const SecretToken = Symbol('Game Config Token');

export interface GameConfig {
  name: string;
  author: string;
  waiting?: number;
  ws?: boolean;
}

export function Game(config: GameConfig): ClassDecorator {
  config.waiting = config.waiting || 10000;
  config.ws = config.ws || false;
  return (target) => {
    requires(config, new RangeError(`'config' should be defined for ${target.constructor.name} game.`));
    requires(config.author, new RangeError(`'config.author' should be defined for ${target.constructor.name} game.`));
    requires(config.name, new RangeError(`'config.name' should be defined for ${target.constructor.name} game.`));
    requires(typeof config.waiting === 'number' && config.waiting >= 0, new RangeError(`'config.waiting' should be greater than or equals to 0 for ${target.constructor.name} game.`));
    requires(typeof config.ws === 'boolean', new RangeError(`'config.ws' should be boolean for ${target.constructor.name} game.`));

    Reflect.defineMetadata("game:config", config, target, SecretToken);
    return target;
  };
}

export function readGameConfig(target: GameBehavior): GameConfig {
  const config = Reflect.getMetadata("game:config", target.constructor, SecretToken);
  requires(config, new RangeError(`Can't find config for ${target.constructor.name} game.`));

  return config;
}
