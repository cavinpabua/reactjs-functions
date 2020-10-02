import {connect} from "react-redux";
import React from "react";
import {Route, Redirect, Link} from "react-router-dom";
import {Layout, Menu,Row, Col,} from "antd";
import {UserAddOutlined, UserOutlined} from "@ant-design/icons";
const { Content, Header } = Layout;
function Public({ component: Component,auth, ...rest }) {

    return(
        <Route {...rest}
               render={props =>
                   !auth.loggedIn ? (
                       <div>
                           <Header>
                               <Menu theme="dark" mode="horizontal" >
                                   <Menu.Item key="1" icon={<UserOutlined />}>
                                       <Link to="/">Login</Link>
                                   </Menu.Item>
                                   <Menu.Item key="2" icon={<UserAddOutlined />}>
                                       <Link to="/register">Register</Link>
                                   </Menu.Item>
                               </Menu>
                           </Header>
                           <Content style={{ marginTop: "100px", marginBottom: "100px" }}>
                               <Row justify="space-around">
                                   <Col span={6} style={{ textAlign: "center" }}>
                                       <Component {...props} />
                                   </Col>
                               </Row>
                           </Content>
                       </div>

                   ) : (
                       <Redirect to={{ pathname: "/list", state: { from: props.location } }} />
                   )
               }
        />
    );
}
const mapStateToProps = (state) => ({
    auth: state.protectedReducer,
});


export default connect(
    mapStateToProps,null
)(Public);
