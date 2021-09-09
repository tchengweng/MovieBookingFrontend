import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllMovies = React.lazy(() => import("./pages/AllMovies"));
const InvalidPath = React.lazy(() => import("./pages/InvalidPath"));
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
          <Route path="*">
            <InvalidPath></InvalidPath>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
