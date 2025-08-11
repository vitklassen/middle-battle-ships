/* eslint-disable no-unused-vars */
import { queryStringify } from './utils'

enum METHOD { // в упор не видит, что METHOD вызывается в коде
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD
  [key: string]: any
}

type OptionsWithoutMethod = Omit<Options, 'method'>

export class HTTP {
  url: string

  constructor(url: string) {
    this.url = url
  }

  get = (path: string, options?: OptionsWithoutMethod) =>
    this.request(
      this.url + path,
      { ...options, method: METHOD.GET },
      options?.timeout
    )

  post = (path: string, options?: OptionsWithoutMethod) =>
    this.request(
      this.url + path,
      { ...options, method: METHOD.POST },
      options?.timeout
    )

  put = (path: string, options?: OptionsWithoutMethod) =>
    this.request(
      this.url + path,
      { ...options, method: METHOD.PUT },
      options?.timeout
    )

  delete = (path: string, options?: OptionsWithoutMethod) =>
    this.request(
      this.url + path,
      { ...options, method: METHOD.DELETE },
      options?.timeout
    )

  request = (url: string, options = {}, timeout = 5000) => {
    const {
      headers = {},
      method,
      data,
      formData,
      credentials,
    } = options as OptionsWithoutMethod

    const isGet = method === METHOD.GET
    url = isGet && !!data ? `${url}${queryStringify(data)}` : url

    const reqHeaders = new Headers()
    let body: FormData | string | unknown

    Object.keys(headers).forEach(key => {
      reqHeaders.set(key, headers[key])
    })

    if (formData) {
      body = formData
    } else if (isGet || (!data && !formData)) {
      body = ''
    } else {
      const json = JSON.stringify(data)
      body = json
    }

    const newOptions: RequestInit = {
      method,
      body: body ? (body as BodyInit) : '',
      headers: reqHeaders,
      credentials,
      signal: AbortSignal.timeout(timeout),
    }

    const request = new Request(url, newOptions as RequestInit)

    return fetch(request)

    /*  
    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }
      




      const xhr = new XMLHttpRequest();
      
      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = !!credentials;
      if (formData) {
        xhr.send(formData);
      } else if (isGet || (!data && !formData)) {
        xhr.send();
      } else {
        const json = JSON.stringify(data);
        xhr.send(json);
      }
    });
    */
  }
}

const apiInstance = new HTTP('https://ya-praktikum.tech/api/v2/')
export default apiInstance
