import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";

import { getAuthorizationToken } from "../utils/authentication";

const token = getAuthorizationToken();

const options = {
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  credentials: "include",
  headers: {
    Authorization: token ? `Bearer ${token}` : ""
  }
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(options),
  new BatchHttpLink(options)
);

const linkChain = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link: linkChain,
  cache: new InMemoryCache()
});

export default client;
