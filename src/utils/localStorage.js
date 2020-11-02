export const getStorageItem = (key) => localStorage.getItem(key);

export const setStorageItem = (key, item) => {
  localStorage.setItem(key, item);
};

export const deleteStorageItem = (key) => {
  localStorage.removeItem(key);
};
