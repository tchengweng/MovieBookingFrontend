import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/Layout/LoadingSpinner";
import Reserve from "./pages/Reserve";

const AllMovies = React.lazy(() => import("./pages/AllMovies"));
const Screenings = React.lazy(() => import("./pages/Screenings"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner></LoadingSpinner>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/AllMovies"></Redirect>
          </Route>
          <Route path="/AllMovies" exact>
            <AllMovies />
          </Route>
          <Route path="/AllMovies/:screeningId" exact>
            <Screenings />
          </Route>
          <Route path="/Reserve" exact>
            <Reserve />
          </Route>
          <Route path="*">
            <Redirect to="/AllMovies"></Redirect>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
