/* eslint-disable no-unused-vars */
import { setError } from '../Features/error';
import { store } from '../Store';
import { queryStringify } from './utils';

enum METHOD { // в упор не видит, что METHOD вызывается в коде
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

type Options = {
  method: string;
  data?: Record<string, unknown>;
  formData?: FormData;
  headers?: Record<string, string | undefined>;
  timeout?: number;
  credentials?: RequestCredentials;
};

interface FetchError {
  reason: string;
  status?: number;
  message?: string;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTP {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.GET },
    options?.timeout,
  );

  post = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.POST },
    options?.timeout,
  );

  put = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.PUT },
    options?.timeout,
  );

  patch = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.PATCH },
    options?.timeout,
  );

  delete = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.DELETE },
    options?.timeout,
  );

  request = async <R>(url: string, options: Options, timeout = 5000) => {
    const {
      headers = {},
      method,
      data,
      formData,
      credentials,
    } = options;

    const isGet = method === METHOD.GET;
    url = isGet && !!data ? `${url}${queryStringify(data)}` : url;

    const reqHeaders = new Headers();
    let body: FormData | string;

    Object.keys(headers).forEach((key) => {
      if (headers[key]) {
        reqHeaders.set(key, headers[key]);
      }
    });

    if (formData) {
      body = formData;
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

    if (!isGet && body) {
      newOptions.body = body;
    }

    const controller = new AbortController();
    const reason = new DOMException('signal timed out', 'TimeoutError');
    const timeoutId = setTimeout(() => controller.abort(reason), timeout);
    try {
      const res = await fetch(url, {
        ...newOptions,
        signal: controller.signal,
      });
      let reason: string;
      let data;
      if (res.headers.get('content-type')?.includes('application/json')) {
        const jsonResponse = await res.json();
        // eslint-disable-next-line prefer-destructuring
        reason = jsonResponse.reason;
        data = jsonResponse;
      } else {
        const text = await res.text();
        reason = text;
        data = text;
      }
      if (!res.ok) {
        const error = {
          reason,
          status: res.status,
        };
        throw error;
      }
      return data as R;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      store.dispatch(
        setError({
          reason: error.reason || error.message,
          status: error.status,
        }),
      );
      if (error.status === 500) {
        // window.location.href = '/error';
      }
      clearTimeout(timeoutId);
      throw error;
    }
    // eslint-disable-next-line max-len
    // Идея с timeout взята в https://dev.to/rashidshamloo/adding-timeout-and-multiple-abort-signals-to-fetch-typescriptreact-33bb?ysclid=me8p95k7hh402956849
  };
}

const apiInstance = new HTTP('http://84.201.140.68:3001');
export default apiInstance;
