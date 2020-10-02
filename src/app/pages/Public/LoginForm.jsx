import React from "react";
import { connect } from "react-redux";
import {Login} from "./Public.actions";
import { Form, Input, Button,Alert } from 'antd';
import {useHistory} from "react-router-dom";
const LoginForm = ({auth, Login}) => {
    let history = useHistory()
    const [values, setValues ] = React.useState({
        identifier: "",
        password: "",
        status: "",
        errMessage: "",
        loading:false
    })

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    const handleChange = (event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }


    const onFinish =async values => {

        await Login(values).then(message => {
            if(message === "success") {
                setValues({ status:"success", errMessage: "",identifier:"", password:""});
                form.resetFields()
                auth.loggedIn = true;
                history.replace('/list')
            } else {
                setValues({ identifier:"", password:"", status:"error", errMessage: message});
            }
        })


    };
        return (
            <div>
                { values.status==="success" ? <Alert message="Login success" type="success" /> : null }
                <br/>
            <Form name="basic" form={form}  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="Email"
                    name="identifier"
                    rules={[{required: true, message: 'Please input your Email!'}]}

                >
                    <Input name="identifier" value={values.identifier} onChange={handleChange}/>
                </Form.Item >

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}

                    validateStatus={values.status}
                    help={values.errMessage}
                    hasFeedback

                >
                    <Input.Password name="password" value={values.password} onChange={handleChange} />
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit" loading={values.loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            </div>
        )


}
const mapDispatchToProps = dispatch => ({
    Login: (values) => dispatch(Login(values)),
});

const mapStateToProps = (state) => ({
    auth: state.protectedReducer,
});

export default connect(
    mapStateToProps,mapDispatchToProps
)(LoginForm);