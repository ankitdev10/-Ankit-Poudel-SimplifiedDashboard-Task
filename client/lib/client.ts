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

    if (headers) {
      const cookieStore = cookies();

      const token = headers.get(AUTH_TOKEN_KEY);
      console.log("token:  got ", token);
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

  console.log("token: ", token);
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
