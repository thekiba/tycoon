import 'reflect-metadata';
import { CancellationToken, containerModule as core, GameRunner, sleep } from '@tycoon/core';
import { Container } from 'inversify';
import { options } from '../config';
import { containerModule as players } from './players';

(async () => {
  const container = new Container();
  let gameRunner: GameRunner;
  while (true) {
    try {
      if (!gameRunner) {
        const cancellationToken = new CancellationToken();
        cancellationToken.finally(() => {
          throw new Error(`Cancelled!`);
        });

        container.unbindAll();
        core(container, options, cancellationToken);
        players(container);
        gameRunner = container.get(GameRunner);
      }
      await gameRunner.start();
    } catch (e) {
      gameRunner = null;
      console.error(e);
      console.info('Restart after 2 minutes');
      await sleep(120000);
    }
  }
})();
