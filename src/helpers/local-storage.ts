import isLocalStorageAvailable from 'src/helpers/is-local-storage-available';
import cookies from 'src/helpers/cookies';

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
