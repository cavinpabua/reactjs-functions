import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ItemList from "./app/pages/AddressBook/AddressBookList";
import ReportList from "./app/pages/Report/ReportList";

import ItemForm from "./app/pages/AddressBook/AddressBookForm";
import items from "./app/pages/AddressBook/AddressBook.reducers";
import { Layout, Row, Col, Menu } from "antd";
import { UserOutlined, BarChartOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Content, Header } = Layout;
// Setup Redux store with Thunks
const reducers = combineReducers({ items });
const store = createStore(reducers, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/">Entry List</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<BarChartOutlined />}>
                <Link to="/report">Statistics</Link>
              </Menu.Item>
            </Menu>
          </Header>

          <Route path="/" exact>
            <Content style={{ marginTop: "100px", marginBottom: "100px" }}>
              <Row justify="space-around">
                <Col span={20} style={{ textAlign: "center" }}>
                  <ItemList />
                  <br />
                  <ItemForm />
                </Col>
              </Row>
            </Content>
          </Route>
          <Route path="/report" exact>
            <Content style={{ marginTop: "100px", marginBottom: "100px" }}>
              <Row justify="space-around">
                <Col span={20} style={{ textAlign: "center" }}>
                  <ReportList />
                </Col>
              </Row>
            </Content>
          </Route>
        </Router>
      </Layout>
    </Provider>
  );
};

export default App;
