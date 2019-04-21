import { Action } from '../api';

export * from './helpers';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function requires<T>(expression: T, error: Error): void {
  if (!expression) {
    throw error;
  }
}

export function unknownAction(action: Action) {
  console.trace(`Unknown action ${JSON.stringify(action)}`);
}
