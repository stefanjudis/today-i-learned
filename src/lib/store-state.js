export const CACHE_KEY = '__TODAY_I_LEARNED';

export const storeState = state => {
  const s = document.createElement('script');
  s.appendChild(
    document.createTextNode(`window.${CACHE_KEY} = ${JSON.stringify(state)}`)
  );
  document.body.appendChild(s);
};
