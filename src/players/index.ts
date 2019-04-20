import { Container } from 'inversify';
import { containerModule as mefest } from './mefest';
import { containerModule as thekiba } from './thekiba';

export function containerModule(container: Container): void {
  mefest(container);
  thekiba(container);
}
