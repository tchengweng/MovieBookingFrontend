import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllMovies from "./pages/AllMovies";
import InvalidPath from "./pages/InvalidPath";

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
          <Route path="*">
            <InvalidPath></InvalidPath>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
