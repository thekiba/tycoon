import { ApiConfig } from '../api';

export class DomainConfig extends ApiConfig {
  author: string;
  game: string;
  friendId: string;
  email?: string;
  password?: string;
}
