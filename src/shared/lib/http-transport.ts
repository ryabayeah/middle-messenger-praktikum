enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: never;
  headers?: Record<string, string>;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

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

export class HTTPTransport {
  get = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout,
    );
  };

  post = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
      options.timeout,
    );
  };

  put = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
      options.timeout,
    );
  };

  delete = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options.timeout,
    );
  };

  request = (
    url: string,
    options: Options = { method: METHOD.GET },
    timeout: number = 5000,
  ) => {
    const { method, data, headers = {} } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
