import { cookies } from "next/headers";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { AUTH_TOKEN_KEY, BACKEND_URL } from "@/config/constants";

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();
    console.log(BACKEND_URL);
    if (headers) {
      const cookieStore = cookies();

      const token = headers.get(AUTH_TOKEN_KEY);
      if (token) {
        cookieStore.set(AUTH_TOKEN_KEY, token);
      }
    }

    return response;
  }),
);

export const { getClient } = registerApolloClient(() => {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      afterwareLink,
      new HttpLink({
        uri: BACKEND_URL,
        credentials: "include",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      }),
    ]),
  });
});
