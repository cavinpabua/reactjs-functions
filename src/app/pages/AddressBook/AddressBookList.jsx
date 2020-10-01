import React, { Component }  from "react";
import { connect } from "react-redux";
import { refreshList,deleteAddress,UpdateAddress,UploadAvatar } from "./AddressBook.actions";
import {Table, Space, Button, Input, DatePicker, Modal, Select, Avatar, Upload, message} from "antd";
import moment from "moment";
import ImgCrop from "antd-img-crop";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
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

class AddressBookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items:this.props.items,
            visible:false,
            firstName:"",
            middleName:"",
            lastName:"",
            id: "",
            age: 0,
            fullName: "",
            dob:"",
            dateValue: "",
            loading: false,
            gender:"",
            avatarUrl:""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleMiddleName = this.handleMiddleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
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
    componentDidMount() {
        this.props.refreshList();
    }
    handleClick() {
        this.props.refreshList();
    }
    handleDelete(id) {
        this.props.deleteAddress(id).then(r => this.props.refreshList())
    }
    handleFirstName(event) {
        this.setState({ firstName: event.target.value });
    }
    handleMiddleName(event) {
        this.setState({ middleName: event.target.value });
    }
    handleLastName(event) {
        this.setState({ lastName: event.target.value });
    }
    handleChangeDate(date, dateString){
        this.setState({ dob:dateString });
        this.setState({ dateValue:moment(date) });

    }
    showModal(item) {
        this.setState({
            visible: true,
        });
        this.setState({ firstName: item.firstName, middleName: item.middleName, lastName: item.lastName, dob:item.dob,dateValue: moment(item.dob), id:item.id, gender:item.gender,avatarUrl:item.avatarUrl });
    };
    handleChangeGender(value) {
        this.setState({ gender: value });
    }
    handleOk(e) {
        this.setState({
            visible: false,
        });
        const { firstName,middleName,lastName,dob,id,gender,avatarUrl } = this.state;
        this.props.UpdateAddress({ firstName,middleName,lastName,dob,id,gender,avatarUrl }).then(r => this.props.refreshList());
    };

    handleCancel(e){
        this.setState({
            visible: false,
        });
    };
    render() {
        const { firstName, middleName, lastName, gender, loading,avatarUrl } = this.state;
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
        let columns = [
            {
                title: 'Avatar',
                dataIndex: 'avatarUrl',
                key: 'avatarUrl',
                render: (text, record) => (
                    <Avatar size={64} src={record.avatarUrl}></Avatar>
                ),
            },
            {
                title: 'Full Name',
                dataIndex: 'fullName',
                key: 'fullName'
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName'
            },
            {
                title: 'Middle Name',
                dataIndex: 'middleName',
                key: 'middleName'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName'
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender'
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: 'Birthday',
                dataIndex: 'dob',
                key: 'dob'
            },
            {
                title: 'Action',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button onClick={() => {this.handleDelete(item.id)}}>Delete</Button>
                        <Button type="primary" onClick={() => {this.showModal(item)}}>
                            Edit
                        </Button>
                    </Space>
                ),
            },
        ]
        return (
            <div >
                <Table dataSource={this.props.items} columns={columns} pagination={{ position: ["bottomCenter"],pageSize: 5 }} scroll={{ x: 500 }} />
                <Modal
                    title="Edit Info"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Save
                        </Button>,
                    ]}
                >
                    <Space size={10}>
                        <Space size={10} direction="vertical">
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
                                    {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </ImgCrop>
                        </Space>
                        <Space size={10} direction="vertical">
                            <Input type="text" id="firstName" value={firstName} placeholder="First Name" onChange={this.handleFirstName} />
                            <Input type="text" id="middleName" value={middleName} placeholder="Middle Name" onChange={this.handleMiddleName} />
                            <Select id="gender"  style={{width:'100%'}} placeholder="Gender" value={gender} onChange={this.handleChangeGender}>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Space>

                        <Space size={10} direction="vertical">
                            <Input type="text" id="lastName" value={lastName} placeholder="Last Name" onChange={this.handleLastName} />
                            <DatePicker type="text" id="dob" ref="datePicker" style={{width:'100%'}} value={this.state.dateValue}  selected={this.state.dob}  placeholder="Date of Birth" onChange={this.handleChangeDate} />
                        </Space>
                    </Space>
                </Modal>
            </div>
        )

    }

}



const mapStateToProps = state => ({
  items: state.items.items
});

const mapDispatchToProps = dispatch => ({
    refreshList: () => dispatch(refreshList).then(()=>{
        dispatch(refreshList)
    }),
    deleteAddress: todo => deleteAddress(todo).then((resp) =>{
        dispatch(refreshList)
    }),
    UpdateAddress: todo => UpdateAddress(todo).then((resp) =>{
        dispatch(refreshList)
    }),
    UploadAvatar: (payload) => UploadAvatar(payload).then((resp) =>{
        dispatch(refreshList)
        return resp
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookList);
