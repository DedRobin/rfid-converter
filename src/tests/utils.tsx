import type { ReactElement, ReactNode } from 'react';

import store from '@store/index';
import {
  render as testingLibraryRender,
  RenderOptions,
} from '@testing-library/react';
import { Provider } from 'react-redux';

function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>; // No wrapper if you don't have global providers
  };

  return testingLibraryRender(ui, { wrapper: AllTheProviders, ...options });
}

// export * from '@testing-library/react';

export { renderWithProviders };
