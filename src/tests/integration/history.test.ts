import { addToHistory, getHistory, clearHistory } from '../../services/history';

describe('History Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds items to history', () => {
    const item = {
      category: 'length',
      fromUnit: 'm',
      toUnit: 'km',
      amount: 1000,
      result: 1,
      date: new Date().toISOString()
    };
    
    addToHistory(item);
    const history = getHistory();
    expect(history.length).toBe(1);
    expect(history[0]).toEqual(item);
  });

  it('limits history size', () => {
    for (let i = 0; i < 15; i++) {
      addToHistory({
        category: 'length',
        fromUnit: 'm',
        toUnit: 'km',
        amount: i,
        result: i / 1000,
        date: new Date().toISOString()
      });
    }
    
    expect(getHistory().length).toBe(10);
  });

  it('clears history', () => {
    addToHistory({
      category: 'length',
      fromUnit: 'm',
      toUnit: 'km',
      amount: 1000,
      result: 1,
      date: new Date().toISOString()
    });
    
    expect(getHistory().length).toBe(1);
    clearHistory();
    expect(getHistory().length).toBe(0);
  });
});