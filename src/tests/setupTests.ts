// Configuration du localStorage pour les tests Jest
class LocalStorageMock {
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
  }
  
  // Mock du localStorage global
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
  });
  
  // Mock de fetch global (si nécessaire)
  global.fetch = jest.fn();
  
  // Nettoyage après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });