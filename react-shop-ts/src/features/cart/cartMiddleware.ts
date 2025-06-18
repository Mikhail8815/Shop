

export const saveCartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('cart/')) {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  }
  return result;
};