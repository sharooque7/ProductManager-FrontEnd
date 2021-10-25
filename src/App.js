import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Buyer from "./components/Buyers/UI/Buyer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./components/store/auth";
import { Auth } from "./components/store/auth";
import React, { useEffect, useContext } from "react";
import InterfaceSeller from "./components/Buyers/UI/InterfaceSeller";
import SinglePostView from "./components/View/SinglePostView";
import Consumer from "./components/Consumer/Consumer";
import store from "./components/store/Redux/ConsumerRedux";
import { Provider } from "react-redux";
const App = () => {
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    ///setLogoutHandler(remainingMilliseconds)
    setToken(token);
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/Buyer"
          render={(props) => (
            <Provider store={store}>
              {" "}
              <Consumer />
            </Provider>
          )}
        />
        <Route
          exact
          path="/Seller"
          render={(props) => (
            // Context Api Auth
            <Auth>
              <Buyer />
            </Auth>
          )}
        />
        <Route
          exact
          path="/seller/Home"
          render={(props) => (
            <Auth>
              {" "}
              <InterfaceSeller />{" "}
            </Auth>
          )}
        />
        <Route
          exact
          path="/seller/:postId"
          render={(props) => <SinglePostView {...props} token={token} />}
        />
        <Route path="/">
          {" "}
          <div className="app">
            <HomePage />
          </div>
        </Route>
        <div>Hello</div>
      </Switch>
    </Router>
  );
};

export default App;
