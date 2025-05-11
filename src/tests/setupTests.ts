import 'jest';
import { jest } from '@jest/globals';
import { afterEach } from '@jest/globals';

class LocalStorageMock implements Storage {
    private store: Record<string, string>;
  
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key: string) {
      return this.store[key] || null;
    }
  
    setItem(key: string, value: string) {
      this.store[key] = String(value);
    }
  
    removeItem(key: string) {
      delete this.store[key];
    }
  
    get length() {
      return Object.keys(this.store).length;
    }
  
    key(index: number) {
      const keys = Object.keys(this.store);
      return keys[index] || null;
    }
  }
  
  global.localStorage = new LocalStorageMock();
  
  global.fetch = jest.fn((): Promise<Response> =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    } as Response)
  );
  
  afterEach(() => {
    jest.clearAllMocks();
  });