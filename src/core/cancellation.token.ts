import { injectable } from 'inversify';

@injectable()
export class CancellationToken implements Promise<void> {
  cancelled: boolean = false;
  reject: () => void;
  resolve: () => void;
  promise: Promise<void>;

  constructor() {
    this.promise = new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  cancel(): void {
    if (!this.cancelled) {
      this.cancelled = true;
      this.reject();
    }
  }

  readonly [ Symbol.toStringTag ]: string;

  catch<TResult = never>(onrejected?: ((reason: any) => (PromiseLike<TResult> | TResult)) | undefined | null): Promise<void | TResult> {
    return this.promise.catch(onrejected);
  }

  finally(onfinally?: (() => void) | undefined | null): Promise<void> {
    return this.promise.finally(onfinally);
  }

  then<TResult1 = void, TResult2 = never>(
    onfulfilled?: ((value: void) => (PromiseLike<TResult1> | TResult1)) | undefined | null,
    onrejected?: ((reason: any) => (PromiseLike<TResult2> | TResult2)) | undefined | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }
}
