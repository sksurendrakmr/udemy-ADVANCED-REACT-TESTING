import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

import { configureStoreWithMiddlewares, RootState } from "../app/store";

type CustomRenderOptions = {
  preloadedState?: RootState;
  renderOptions?: Omit<RenderOptions, "wrapper">;
  routeHistory?: Array<string>;
  initialRouteIndex?: number;
};

function render(
  ui: ReactElement,
  { preloadedState = {}, routeHistory, initialRouteIndex, ...renderOptions }: CustomRenderOptions = {}
): RenderResult {
  const Wrapper: React.FC = ({ children }) => {
    const store = configureStoreWithMiddlewares(preloadedState);
    const history = createMemoryHistory({ initialEntries: routeHistory, initialIndex: initialRouteIndex })
    return (
      <Provider store={store}>
        <Router history={history}>
          {children}
        </Router>
      </Provider>)
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
