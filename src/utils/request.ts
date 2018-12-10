import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { normalizeUrl } from "./utils";

export function request<T>(params: IRequestParams<T>): Promise<T> {
  let promise;
  if (params.url) {
    params.fetchOptions = addDefaultRequestParams(
      params.url,
      params.fetchOptions
    );
    promise = fetch(
      normalizeUrl(params.url),
      params.fetchOptions || Object.create(null)
    ).then(response => {
      if (response.ok) {
        return response.json().then(data => JSON.stringify(data));
      } else {
        if (response.status >= 500) {
          return Promise.reject(
            "An unexpected error has occured: #" + response.status
          );
        } else {
          return response.text().then(text => Promise.reject(text));
        }
      }
    });
  } else if (params.method) {
    promise = params.method();
  } else {
    throw new Error("Wrong request params!");
  }
  // TODO catch errors

  return promise;
}

const defaultOptions: IFetchOptions = {
  credentials: "include"
};

function addDefaultRequestParams(
  url: string,
  options: IFetchOptions = Object.create(null)
): IFetchOptions {
  if (isEmpty(options.credentials) && options.method !== "POST") {
    options.credentials = "include";
  }
  return options;
}

export interface IRequestParams<T> {
  url?: string;
  data?: object;
  method?: () => Promise<T>;
  fetchOptions?: IFetchOptions;
}

declare const fetch: (url: string, options?: IFetchOptions) => Promise<any>;

export interface IFetchOptions {
  method?: "POST" | "GET";
  headers?: object;
  credentials?: string;
  body?: string;
}
