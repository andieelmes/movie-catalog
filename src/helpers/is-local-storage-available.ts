// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage

export default function isLocalStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22 // everything except Firefox
      || e.code === 1014 // Firefox
      // test name field too, because code might not be present
      || e.name === 'QuotaExceededError' // everything except Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') // Firefox
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0);
  }
}
