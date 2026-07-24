// IndexedDB helper for persisting uploaded video files permanently in browser storage

const DB_NAME = 'KawsStoreVideoDB';
const STORE_NAME = 'videos';
const VIDEO_KEY = 'hero_custom_video';
const URL_STORAGE_KEY = 'kaws_hero_video_url_preset';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves a File/Blob directly into IndexedDB so it survives page reloads and browser sessions.
 */
export async function saveVideoFile(file: Blob): Promise<string> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, VIDEO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    // Also save a timestamp flag in localStorage
    localStorage.setItem('kaws_video_saved_type', 'file');
    localStorage.setItem('kaws_video_saved_time', Date.now().toString());

    return URL.createObjectURL(file);
  } catch (err) {
    console.error('Failed to save video to IndexedDB:', err);
    return URL.createObjectURL(file);
  }
}

/**
 * Saves a Video URL into localStorage.
 */
export function saveVideoUrl(url: string): void {
  localStorage.setItem(URL_STORAGE_KEY, url);
  localStorage.setItem('kaws_video_saved_type', 'url');
  localStorage.setItem('kaws_video_saved_time', Date.now().toString());
}

/**
 * Retrieves saved video (from IndexedDB Blob or localStorage URL).
 */
export async function getSavedVideo(): Promise<{ url: string; isSaved: boolean; type: 'file' | 'url' } | null> {
  try {
    const type = localStorage.getItem('kaws_video_saved_type');
    
    // Check IndexedDB first
    const db = await openDB();
    const blob = await new Promise<Blob | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(VIDEO_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });

    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      return { url: objectUrl, isSaved: true, type: 'file' };
    }

    // Check URL storage
    const savedUrl = localStorage.getItem(URL_STORAGE_KEY);
    if (savedUrl) {
      return { url: savedUrl, isSaved: true, type: 'url' };
    }
  } catch (err) {
    console.warn('Error loading saved video from storage:', err);
  }

  return null;
}

/**
 * Clears saved custom video from storage and reverts to default.
 */
export async function clearSavedVideo(): Promise<void> {
  try {
    localStorage.removeItem(URL_STORAGE_KEY);
    localStorage.removeItem('kaws_video_saved_type');
    localStorage.removeItem('kaws_video_saved_time');

    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(VIDEO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to clear video storage:', err);
  }
}
