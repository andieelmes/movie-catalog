import isLocalStorageAvailable from './is-local-storage-available';
import cookies from './cookies';

const localStorageAvailable = isLocalStorageAvailable();

function get(name: string) {
  return localStorageAvailable ? localStorage.getItem(name) : cookies.get(name);
}

function set(name: string, value: string) {
  if (localStorageAvailable) {
    localStorage.setItem(name, value);
    return;
  }

  cookies.set(name, value);
}

export default {
  get,
  set,
};
