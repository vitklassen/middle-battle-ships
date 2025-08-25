/* eslint-disable no-unused-vars */
import { setError } from '../Features/error'
import { store } from '../Store'
import { queryStringify } from './utils'

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

  get = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.GET },
    options?.timeout as number,
  );

  post = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.POST },
    options?.timeout as number,
  );

  put = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.PUT },
    options?.timeout as number,
  );

  delete = <R>(path: string, options?: OptionsWithoutMethod) => this.request<R>(
    this.url + path,
    { ...options, method: METHOD.DELETE },
    options?.timeout as number,
  );

  request = async <R>(url: string, options = {}, timeout = 5000) => {
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
    let body: FormData | string;

    Object.keys(headers).forEach((key) => {
      reqHeaders.set(key, headers[key]);
    });

    if (formData) {
      body = formData as FormData;
    } else {
      reqHeaders.set('content-type', 'application/json');
      const json = JSON.stringify(data);
      body = json;
    }

    const newOptions: RequestInit = {
      method,
      body: isGet ? undefined : body,
      headers: reqHeaders,
      credentials: credentials || 'include',
    };

    if (body) {
      newOptions.body = body as BodyInit;
    }
    const controller = new AbortController();
    const reason = new DOMException('signal timed out', 'TimeoutError');
    const timeoutId = setTimeout(() => controller.abort(reason), timeout);
    try {
      const res = await fetch(url, {
        ...newOptions,
        signal: controller.signal,
      })
      let reason: string
      let data
      if (res.headers.get('content-type')?.includes('application/json')) {
        const json = await res.json()
        reason = json.reason
        data = json
      } else {
        const text = await res.text()
        reason = text
        data = text
      }
      if (!res.ok) {
        const error = {
          reason,
          status: res.status,
        }
        throw error
      }
      return data as R
    } catch (error: any) {
      if (error.status !== 401) {
        store.dispatch(
          setError({
            reason: error.reason || error.message,
            status: error.status,
          })
        )
      }
      if (error.status === 500) {
        window.location.href = '/error';
      }
      clearTimeout(timeoutId)
      throw error
    }
    // eslint-disable-next-line max-len
    //Идея с timeout взята в https://dev.to/rashidshamloo/adding-timeout-and-multiple-abort-signals-to-fetch-typescriptreact-33bb?ysclid=me8p95k7hh402956849
  }
}

const apiInstance = new HTTP('https://ya-praktikum.tech/api/v2/');
export default apiInstance;
