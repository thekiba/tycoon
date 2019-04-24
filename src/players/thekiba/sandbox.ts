import { DomainConfig, DomainService, Game, GameBehavior } from '@tycoon/core';
import { inject, injectable } from 'inversify';
import { ReplOptions, REPLServer } from 'repl';

const repl = require('repl');

@Game({
  author: 'thekiba',
  name: 'sandbox',
  waiting: 0,
  ws: true
})
@injectable()
export class SandboxGame implements GameBehavior {

  constructor(
    @inject(DomainConfig) readonly config: DomainConfig,
    @inject(DomainService) readonly domain: DomainService
  ) {}

  async start(): Promise<void> {
    return new Promise<void>((resolve) => {
      const options: ReplOptions = {};
      const replServer: REPLServer = repl.start();
      replServer.context.domain = this.domain;
      replServer.context.api = this.domain.api;
      replServer.context.site = this.domain.site;
      replServer.context.ad = this.domain.ad;
      replServer.context.content = this.domain.content;
      replServer.context.worker = this.domain.worker;
      replServer.context.task = this.domain.task;
      replServer.context.state = this.domain.state;
      replServer.context.config = this.config;
      replServer.addListener('exit', () => resolve());
    });
  }
}
