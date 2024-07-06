export const getUrlPathName = (): string => {
  return document.location.pathname.replace('/', '');
};

export const redirect = (path: string): void => {
  const origin = window.location.origin;
  window.location.href = `${origin}/${path}`;
};
