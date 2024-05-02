import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

// ROLLBAR MONITORING
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '39a2af894a974c6eab424e23f87a8990',
  environment: process.env.NODE_ENV || 'local',
}



const App = () => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
