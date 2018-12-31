import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { onError } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";

import { getAuthorizationToken } from "../utils/authentication";

const serverUri = `${process.env.REACT_APP_API_URL}/graphql`;

const customFetch = (uri, options) => {
  const token = getAuthorizationToken();
  const authHeader = `Bearer ${token}`;
  options.headers.Authorization = authHeader;
  options.credentials = "include";
  return fetch(uri, options);
};

const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink({ uri: serverUri, fetch: customFetch }),
  new BatchHttpLink({ uri: serverUri, fetch: customFetch })
);

const linkChain = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link: linkChain,
  cache: new InMemoryCache()
});

export default client;
