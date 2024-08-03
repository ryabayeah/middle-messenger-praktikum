export const getUrlPathName = (): string => {
  return document.location.pathname.replace('/', '');
};

