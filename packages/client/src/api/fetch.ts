/* eslint-disable no-unused-vars */
import { queryStringify } from './utils';

enum METHOD { // в упор не видит, что METHOD вызывается в коде
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: string,
  data: {[key: string]: unknown},
  credentials: RequestCredentials,
  headers: {[key: string]: string}
  [key: string]: string | number | object,
}

type OptionsWithoutMethod = Omit<Options, 'method'>

export class HTTP {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get = (path: string, options?: OptionsWithoutMethod) => this.request(
    this.url + path,
    { ...options, method: METHOD.GET },
    options?.timeout as number,
  );

  post = (path: string, options?: OptionsWithoutMethod) => this.request(
    this.url + path,
    { ...options, method: METHOD.POST },
    options?.timeout as number,
  );

  put = (path: string, options?: OptionsWithoutMethod) => this.request(
    this.url + path,
    { ...options, method: METHOD.PUT },
    options?.timeout as number,
  );

  delete = (path: string, options?: OptionsWithoutMethod) => this.request(
    this.url + path,
    { ...options, method: METHOD.DELETE },
    options?.timeout as number,
  );

  request = async (url: string, options = {}, timeout = 5000) => {
    const {
      headers = {},
      method,
      data,
      formData,
      credentials,
    } = options as Options;

    const isGet = method === METHOD.GET;
    url = isGet && !!data ? `${url}${queryStringify(data)}` : url;

    const reqHeaders = new Headers();
    let body: FormData | string | unknown;

    Object.keys(headers).forEach((key) => {
      reqHeaders.set(key, headers[key]);
    });

    if (formData) {
      body = formData;
    } else if (isGet || (!data && !formData)) {
      body = '';
    } else {
      reqHeaders.set('content-type', 'application/json');
      const json = JSON.stringify(data);
      body = json;
    }

    const newOptions: RequestInit = {
      method,
      headers: reqHeaders,
      credentials: credentials || 'include',
    };

    if (body) {
      newOptions.body = body as BodyInit;
    }
    const controller = new AbortController();
    const reason = new DOMException('signal timed out', 'TimeoutError');
    const timeoutId = setTimeout(() => controller.abort(reason), timeout);
    const request = new Request(url, {
      ...newOptions,
      signal: controller.signal,
    } as RequestInit);
    let res: Promise<Response>;
    try {
      res = fetch(request);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
    return res;
    // eslint-disable-next-line max-len
    // Идея с timeout взята в https://dev.to/rashidshamloo/adding-timeout-and-multiple-abort-signals-to-fetch-typescriptreact-33bb?ysclid=me8p95k7hh402956849
  };
}

const apiInstance = new HTTP('https://ya-praktikum.tech/api/v2/');
export default apiInstance;
