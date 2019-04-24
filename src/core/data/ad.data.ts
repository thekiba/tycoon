import { inject, injectable } from 'inversify';
import { StateService, UserService } from '../services/domains';
import { Ad, InitResponse } from '../interfaces';
import { Api } from '../api';
import { DomainConfig } from '../config';
import * as path from 'path';
import * as fs from 'fs';

@injectable()
export class AdDataService {
  get state(): InitResponse {
    return this.stateService.state;
  }

  set state(state: InitResponse) {
    this.stateService.state = state;
  }

  private fileName: string = 'ads.json';
  private filePath: string = path.join(process.cwd(), 'data', this.fileName);

  constructor(
    @inject(Api) private api: Api,
    @inject(DomainConfig) private config: DomainConfig,
    @inject(StateService) private stateService: StateService,
    @inject(UserService) private userService: UserService
  ) {}

  async init(): Promise<void> {
    if (this.config.friendId) {
      this.createDataFile();

      const ads = this.readDataFile();
      const friend = await this.userService.getUserInfo(this.config.friendId);

      this.state = { ...this.state, extraAds: ads, extraSites: friend.sites };
    } else {
      this.state = { ...this.state, extraAds: [], extraSites: [] };
    }
  }

  createAd(ad: Ad): void {
    this.writeDataFile(ad, 'create');
    const ads = this.readDataFile();
    this.state = { ...this.state, extraAds: ads };
  }

  updateAd(ad: Ad): void {
    this.writeDataFile(ad, 'update');
    const ads = this.readDataFile();
    this.state = { ...this.state, extraAds: ads };
  }

  deleteAd(ad: Ad): void {
    this.writeDataFile(ad, 'delete');
    const ads = this.readDataFile();
    this.state = { ...this.state, extraAds: ads };
  }

  private createDataFile(): void {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]');
    }
  }

  private readDataFile(): Ad[] {
    const content: string = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(content) || [];
  }

  private writeDataFile(ad: Ad, op: 'create' | 'update' | 'delete'): void {
    let ads = this.readDataFile();
    switch (op) {
      case 'create':
        ads.push(ad);
        break;
      case 'update':
        const index = ads.findIndex((a) => a.id === ad.id);
        if (index > -1) {
          ads[index] = ad;
        }
        break;
      case 'delete':
        ads = ads.filter((a) => a.id !== ad.id);
        break;
    }
    fs.writeFileSync(this.filePath, JSON.stringify(ads, null, 2));
  }
}
