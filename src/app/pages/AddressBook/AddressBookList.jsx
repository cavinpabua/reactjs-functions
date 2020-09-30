import React, { Component }  from "react";
import { connect } from "react-redux";
import { refreshList,deleteAddress,UpdateAddress } from "./AddressBook.actions";
import {Table, Space, Button, Input, DatePicker, Modal, Select} from "antd";
import moment from "moment";
const { Option } = Select;

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
            gender:""
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
        this.setState({ firstName: item.firstName, middleName: item.middleName, lastName: item.lastName, dob:item.dob,dateValue: moment(item.dob), id:item.id, gender:item.gender });
    };
    handleChangeGender(value) {
        this.setState({ gender: value });
    }
    handleOk(e) {
        this.setState({
            visible: false,
        });
        const { firstName,middleName,lastName,dob,id,gender } = this.state;
        this.props.UpdateAddress({ firstName,middleName,lastName,dob,id,gender }).then(r => this.props.refreshList());
    };

    handleCancel(e){
        this.setState({
            visible: false,
        });
    };
    render() {
        const { firstName, middleName, lastName,gender } = this.state;
        let columns = [
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
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookList);
