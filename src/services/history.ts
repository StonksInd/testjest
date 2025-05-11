const HISTORY_KEY = 'unitConverterHistory';
const MAX_HISTORY_ITEMS = 10;

export interface HistoryItem {
  category: string;
  fromUnit: string;
  toUnit: string;
  amount: number;
  result: number;
  date: string;
}

export function getHistory(): HistoryItem[] {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

export function addToHistory(item: HistoryItem) {
  let history = getHistory();
  history.unshift(item);
  
  if (history.length > MAX_HISTORY_ITEMS) {
    history = history.slice(0, MAX_HISTORY_ITEMS);
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}