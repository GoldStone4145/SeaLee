const DB_NAME = 'HomePlateOnDevicePrivacyDB';
const STORE_NAME = 'keyword_patterns';

export function saveKeywordsLocally(keywords) {
  if (typeof window === 'undefined' || !window.indexedDB) return;
  try {
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'word' });
      }
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      keywords.forEach((kw) => store.put(kw));
    };
  } catch (e) {
    console.warn('IndexedDB local save warning:', e);
  }
}


