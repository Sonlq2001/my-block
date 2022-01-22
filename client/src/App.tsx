import { Suspense, lazy } from "react";

import { BrowserRouter as Router } from "react-router-dom";

const Routes = lazy(() => import("./routes/Routes"));

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router>
        <Routes />
      </Router>
    </Suspense>
  );
};

export default App;
