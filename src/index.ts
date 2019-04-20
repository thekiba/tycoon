import 'reflect-metadata';
import { CancellationToken, containerModule as core, GameRunner, sleep } from '@tycoon/core';
import { Container } from 'inversify';
import { options } from '../config';
import { containerModule as players } from './players';

(async () => {
  const container = new Container();
  let gameRunner: GameRunner;
  let cancellationToken: CancellationToken;
  while (true) {
    try {
      if (!gameRunner) {
        cancellationToken = new CancellationToken();

        container.unbindAll();
        core(container, options, cancellationToken);
        players(container);
        gameRunner = container.get(GameRunner);
        cancellationToken.finally(() => {
          throw new Error(`Cancelled!`);
        });
      }
      await gameRunner.start();
    } catch (e) {
      cancellationToken.cancel();
      gameRunner = null;
      cancellationToken = null;
      console.error(e);
      console.info('Restart after 2 minutes');
      await sleep(120000);
    }
  }
})();
