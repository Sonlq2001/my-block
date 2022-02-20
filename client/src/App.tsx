import { Suspense, lazy } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import ScrollToTop from './helpers/ScrollToTop';
const Routes = lazy(() => import('./routes/Routes'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
    </Suspense>
  );
};

export default App;
