import { ApiError } from '../api';

export const apiBaseErrorHandler = (error: ApiError) => {
  const BASE_ERROR_MESSAGE = 'Произошла непредвиденная ошибка';
  throw new Error(error.reason || BASE_ERROR_MESSAGE);
};
