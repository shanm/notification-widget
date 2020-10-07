import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import { Route } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const NotificationList = lazy(() => import("./components/NotificationList"));

function App(props) {
  return (
    <>
      <Header />
      <div className="spacer"></div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Route path="/" exact component={Home} />
        <Route path="/notifications" component={NotificationList} />
      </Suspense>
    </>
  );
}

export default App;
