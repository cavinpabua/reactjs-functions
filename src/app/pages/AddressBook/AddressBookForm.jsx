import React, { Component } from "react";
import { connect } from "react-redux";
import { refreshList,addAddress, UploadAvatar } from "./AddressBook.actions";
import { Input,DatePicker,Row,Col,Button,Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import moment from "moment";
const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            date: "",
            dateValue: "",
            gender:null,
            loading: false,
            file:null,
            avatarUrl:""
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleMiddleName = this.handleMiddleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.customUpload = this.customUpload.bind(this);

    }
     customUpload = async ({ onError, onSuccess, file }) => {
        let url = await this.props.UploadAvatar({ file });
         this.setState({ avatarUrl: url.url });
        onSuccess(null, url);
    }
    handleUpload = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleFirstName(event) {
        this.setState({ firstName: event.target.value });
    }
    handleMiddleName(event) {
        this.setState({ middleName: event.target.value });
    }
    handleLastName(event) {
        this.setState({ lastName: event.target.value });
    }
    handleChangeGender(value) {
        this.setState({ gender: value });
    }
    handleChangeDate(date, dateString){
        this.setState({ dob:dateString });
        this.setState({ dateValue:moment(date) });

    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstName,middleName,lastName,dob,gender,avatarUrl } = this.state;
        if (firstName.length > 0 && lastName.length > 0 && dob.length > 0) {
            this.props.addAddress({firstName, middleName, lastName, dob, gender,avatarUrl});
            this.setState({ firstName:"",middleName:"",lastName:"",dob:"",dateValue:"",gender:null,avatarUrl:"" });
        }
    }

    render() {
        const { firstName,middleName,lastName,gender, loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const onPreview = async file => {
            let src = file.url;
            if (!src) {
                src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow.document.write(image.outerHTML);
        };

        return (
            <div>
                <Row justify="space-around" >
                    <Row justify="start" gutter={[16, 16]}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{span: 12}}>
                            <ImgCrop rotate>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    multiple={false}
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onPreview={onPreview}
                                    customRequest={this.customUpload}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleUpload}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </ImgCrop>

                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{span: 12}}>
                            <Input type="text" id="firstName" value={firstName} placeholder="First Name" onChange={this.handleFirstName} />
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{span: 12}}>
                            <Input type="text" id="middleName" value={middleName} placeholder="Middle Name" onChange={this.handleMiddleName} />
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{span: 12}}>
                            <Select id="gender"  style={{width:'100%'}} placeholder="Gender" value={gender} onChange={this.handleChangeGender}>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{span: 12}}>
                            <Input type="text" id="lastName" value={lastName} placeholder="Last Name" onChange={this.handleLastName} />
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{span: 12}}>
                            <DatePicker type="text" id="dob" ref="datePicker" style={{width:'100%'}} value={this.state.dateValue}  selected={this.state.dob}  placeholder="Date of Birth" onChange={this.handleChangeDate} />
                        </Col>
                    </Row>
                </Row>
                <br/>
                <Button type="primary" onClick={this.handleSubmit}>Add Item</Button>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    addAddress: (payload) => addAddress(payload).then((resp) =>{
        dispatch(refreshList)
    }),
    UploadAvatar: (payload) => UploadAvatar(payload).then((resp) =>{
        dispatch(refreshList)
        return resp
    })
});

const FormList =  connect(
    null,
    mapDispatchToProps
)(ItemList);

export default FormList;