import { HTTPTransport } from '../lib';
import { BASE_URL } from './paths';

export const yandexApi = new HTTPTransport(BASE_URL);
