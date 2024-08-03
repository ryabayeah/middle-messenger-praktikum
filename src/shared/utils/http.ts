import { ApiError, RESOURCES_URL } from '../api';

export const apiBaseErrorHandler = (error: ApiError) => {
  const BASE_ERROR_MESSAGE = 'Произошла непредвиденная ошибка';
  throw new Error(error.reason || BASE_ERROR_MESSAGE);
};

const DEFAULT_FILE_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png';

export const getResource = (
  srcPath?: string,
  defaultSrc: string = DEFAULT_FILE_SRC,
): string => {
  let src = defaultSrc;
  if (srcPath) {
    src = `${RESOURCES_URL}${srcPath}`;
  }
  return src;
};
