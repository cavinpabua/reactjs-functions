import React from "react";
import { connect } from "react-redux";
import { ChangePassword } from "../Protected/Protected.actions";
import {Form, Input, Button, Alert, Col} from 'antd';

const LoginForm = ({signup, authReducer}) => {
    const [values, setValues ] = React.useState({
        old_pass: "",
        new_pass: "",
        status: "",
        loading: false
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
        setValues({...values,loading: true})
        await ChangePassword(values).then(message => {
            if(message === "success") {
                setValues({ status:"success", errMessage: "",new_pass:"", old_pass:"", loading: false});
                form.resetFields()
            } else {
                setValues({ status:"error", errMessage: message,new_pass:"", old_pass:"", loading: false});
            }


        })


    };
    return (
        <Col span={12} style={{ textAlign: "center" }}>
            { values.status==="success" ? <Alert message="Password Changed Successfully" type="success" /> : null }
            <br/>
            <Form name="basic" form={form}  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>

                <Form.Item
                    label="Old Password"
                    name="old_pass"
                    rules={[{required: true, message: 'Please input your password!'}]}

                    validateStatus={values.status}
                    hasFeedback

                >
                    <Input.Password name="old_pass" value={values.old_pass} onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_pass"
                    rules={[{required: true, message: 'Please input your password!'}]}

                    validateStatus={values.status}
                    help={values.errMessage}
                    hasFeedback

                >
                    <Input.Password name="new_pass" value={values.new_pass} onChange={handleChange} />
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit" loading={values.loading}>
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    )


}
const mapDispatchToProps = dispatch => ({
    ChangePassword: () => dispatch(ChangePassword).then(()=>{
        dispatch(ChangePassword)
    })
});

export default connect(
    null,mapDispatchToProps
)(LoginForm);