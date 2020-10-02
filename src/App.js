import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Protected from "./app/pages/Protected/Protected";
import Public from "./app/pages/Public/Public";
import RegisterForm from "./app/pages/Public/RegisterForm";
import LoginForm from "./app/pages/Public/LoginForm";
import ChangePassword from "./app/pages/Protected/ChangePassword";
import AddressBookList from "./app/pages/AddressBook/AddressBookList";
import ReportList from "./app/pages/Report/ReportList";
import items from "./app/pages/AddressBook/AddressBook.reducers";
import protectedReducer from "./app/pages/Protected/Protected.reducers";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { Layout } from "antd";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
const reducers = combineReducers({ items, protectedReducer });
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Router>
            <Switch>
              <Public path="/" exact component={LoginForm} />
              <Public path="/register" exact component={RegisterForm} />
              <Protected exact path="/list" component={AddressBookList} />
              <Protected exact path="/statistics" component={ReportList} />
              <Protected exact path="/settings" component={ChangePassword} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default App;
