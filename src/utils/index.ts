export * from './helpers';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function requires<T>(expression: T, error: Error): void {
  if (!expression) {
    throw error;
  }
}
