import "reflect-metadata";
import { Container } from 'inversify';
import { options } from '../config';
import { containerModule as players, GameRunner } from './players';
import { containerModule as services, DomainConfig } from './services';
import { ApiConfig } from './services/api/api';
import { sleep } from './utils';

(async () => {
  const container = new Container();
  container.bind(DomainConfig).toConstantValue(options);
  container.bind(ApiConfig).toConstantValue(options);
  services(container);
  players(container);

  while (true) {
    try {
      const game = container.get(GameRunner);

      await game.start();
      await sleep(10000);

    } catch (e) {
      console.error(e);
      console.info('Restart after 2 minutes');
      await sleep(120000);
    }
  }
})();
