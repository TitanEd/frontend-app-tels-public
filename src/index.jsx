import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FooterSlot } from '@edx/frontend-component-footer';
import messages from './i18n';
import AppRoutes from './routes/AppRoutes';
import HeaderSlot from './plugin-slots/HeaderSlot';
import { localIndigoConfig } from './tels-chrome/localIndigoConfig';
import './index.scss';

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);
subscribe(APP_READY, () => {
  root.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <div className="tels-shell d-flex flex-column min-vh-100">
          <HeaderSlot />
          <main id="main" className="flex-grow-1">
            <AppRoutes />
          </main>
          <FooterSlot />
        </div>
      </QueryClientProvider>
    </AppProvider>,
  );
});
subscribe(APP_INIT_ERROR, (error) => {
  root.render(<ErrorPage message={error.message} />);
});
initialize({
  messages,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig(localIndigoConfig, 'Public MFE local Indigo/Tels chrome config');
    },
  },
});
