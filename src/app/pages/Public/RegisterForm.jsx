import React from "react";
import { connect } from "react-redux";
import { Register } from "./Public.actions";
import { Form, Input, Button,Alert } from 'antd';

const RegisterForm = () => {
    const [values, setValues ] = React.useState({
        identifier: "",
        password: "",
        confirmpassword:"",
        status: "",
        errMessage: ""
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


    const onFinish = values => {
        if(values.password !== values.confirmpassword){
            setValues({ status:"error", errMessage: "Confirm Password does not match"});
        }else {
            Register(values).then(message => {
                if(message === "success") {
                    setValues({ status:"success", errMessage: "",identifier:"", password:"", confirmpassword:""});
                    form.resetFields()
                } else {
                    setValues({ identifier:"", password:"", confirmpassword:""});
                    setValues({ status:"error", errMessage: message});
                }

            })
        }

    };
        return (
            <div>
                { values.status==="success" ? <Alert message="Registration Successful! You can now login." type="success" /> : null }
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
                    hasFeedback

                >
                    <Input.Password name="password" value={values.password} onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    rules={[{required: true, message: 'Please input your password!'}]}

                    validateStatus={values.status}
                    help={values.errMessage}
                    hasFeedback
                >
                    <Input.Password name="confirmpassword" value={values.confirmpassword} onChange={handleChange}/>
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
            </div>
        )


}
const mapDispatchToProps = dispatch => ({
    Register: () => dispatch(Register).then(()=>{
        dispatch(Register)
    })
});

export default connect(
    null,mapDispatchToProps
)(RegisterForm);