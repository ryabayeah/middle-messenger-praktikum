function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data?: Record<string, unknown> | FormData;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
};

type HTTPRequest = <T>(url: string, options: Options) => Promise<T>;

type HTTPMethod = <R = unknown>(
  url: string,
  options?: Omit<Options, 'method'>,
) => Promise<R>;

export class HTTPTransport {
  baseUrl?: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
  }

  request: HTTPRequest = (url, options) => {
    const {
      method,
      data,
      headers = {},
      withCredentials = true,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = timeout;

      let finalUrl = this.baseUrl + url;
      if (method === METHODS.GET && data) {
        finalUrl += queryStringify(data as Record<string, unknown>);
      }
      xhr.open(method, finalUrl);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        const status = xhr.status || 0;

        if (status >= 200 && status < 300) {
          resolve(
            xhr.response === 'OK' ? xhr.response : JSON.parse(xhr.response),
          );
        } else {
          try {
            reject(
              JSON.parse(xhr.response),
            );
          } catch (e) {
            reject(xhr.response)
            console.error(e);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = withCredentials;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };

  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE });
}
