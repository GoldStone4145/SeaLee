/**
 * Zero-Cloud On-Device Privacy Storage Engine (IndexedDB)
 * Guarantees 0-Byte external server transmission for personal family chat patterns
 */

const DB_NAME = 'PiBridgeOnDevicePrivacyDB';
const DB_VERSION = 1;
const STORE_NAME = 'conversationKeywords';

export function openLocalPrivacyDb() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return resolve(null);
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'word' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveKeywordsLocally(keywordsArray) {
  const db = await openLocalPrivacyDb();
  if (!db) return false;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    keywordsArray.forEach((item) => store.put(item));
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => resolve(false);
  });
}

