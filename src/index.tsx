import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { theme } from "./theme";
import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/Scrollbar/scrollbar.css";
import "./theme/global.css";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
  headers: {
    Authorization:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDQwMDI3NDMsImV4cCI6MTYzNTUzODc0MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXSwidXNlcklEIjoiNWQwYjU1NTFkMDdmZmIwMDE3YmVkZWU2In0.pCEFMACUMmv1FV-zPy_KOfVicjoqHCY0Fs0yyzzbaRo",
  },
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await localStorage.getItem("myAuthToken");
  // console.log("auth-tokeh:", token);
  const currentWallet = localStorage.getItem("currentWallet");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
      account: currentWallet ? currentWallet : "",
    },
  };
});

const subscription_client = new SubscriptionClient(
  process.env.REACT_APP_API_WS_URL,
  { reconnect: true }
);

const wsLink = new WebSocketLink(subscription_client);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
  // httpLink
);

const client = new ApolloClient({
  // uri: process.env.REACT_APP_API_URL,
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  const engine = new Styletron();

  return (
    <ApolloProvider client={client as any}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </BaseProvider>
      </StyletronProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
//