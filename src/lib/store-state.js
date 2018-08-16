export const CACHE_KEY = '✏️__TODAY_I_LEARNED__✏️';

export const storeState = state => {
  const s = document.createElement('script');
  const firstScript = document.querySelector('script');
  s.appendChild(
    document.createTextNode(`window['${CACHE_KEY}'] = ${JSON.stringify(state)}`)
  );
  document.body.insertBefore(s, firstScript);
};

export const getStoredState = () => {
  if (window[CACHE_KEY]) {
    const state = window[CACHE_KEY];
    delete window[CACHE_KEY];
    return state;
  } else {
    return null;
  }
};
