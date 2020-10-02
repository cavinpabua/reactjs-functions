import {connect} from "react-redux";
import React from "react";
import {Route, Redirect, Link, useHistory} from "react-router-dom";
import { sessionCheck, Logout } from "./Protected.actions";
import {Layout, Menu,Row, Col,} from "antd";
import {BarChartOutlined, UserOutlined,LogoutOutlined,SettingOutlined} from "@ant-design/icons";
const { Content, Header } = Layout;
function Protected({ component: Component, auth, ...rest }) {
    let history = useHistory()
    const logout = errorInfo => {
        Logout().then(message => {
            history.replace('/')
            auth.loggedIn = false;
        })
    };


    return(
        <Route {...rest}
               render={props =>
                   auth.loggedIn ? (
                       <div>
                       <Header>
                           <Menu theme="dark" mode="horizontal" >
                               <Menu.Item key="1" icon={<UserOutlined />}>
                                   <Link to="/list">Entry List</Link>
                               </Menu.Item>
                               <Menu.Item key="2" icon={<BarChartOutlined />}>
                                   <Link to="/statistics">Statistics</Link>
                               </Menu.Item>
                               <Menu.Item key="3" icon={<SettingOutlined />}>
                                   <Link to="/settings">Change Password</Link>
                               </Menu.Item>
                               <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logout}>
                                   Logout
                               </Menu.Item>
                           </Menu>
                       </Header>
                           <Content style={{ marginTop: "100px", marginBottom: "100px" }}>
                               <Row justify="space-around">
                                   <Col span={20} style={{ textAlign: "center" }}>
                                       <Component {...props} />
                                   </Col>
                               </Row>
                           </Content>
                       </div>
                   ) : (
                       <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                   )
               }
        />
    );
}


const mapDispatchToProps = dispatch => ({
    sessionCheck: () => dispatch(sessionCheck).then(()=>{
        dispatch(sessionCheck)
    }),
    Logout: () => dispatch(Logout).then(()=>{
        dispatch(Logout)
    })
});
const mapStateToProps = (state) => ({
    auth: state.protectedReducer,
});

export default connect(
    mapStateToProps,mapDispatchToProps
)(Protected);
