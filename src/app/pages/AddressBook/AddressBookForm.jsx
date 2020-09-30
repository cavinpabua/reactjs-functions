import React, { Component } from "react";
import { connect } from "react-redux";
import { refreshList,addAddress } from "./AddressBook.actions";
import { Input,DatePicker,Row,Col,Button,Select } from 'antd';
import moment from "moment";
const { Option } = Select;
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
            gender:null
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleMiddleName = this.handleMiddleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);

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
    handleChangeGender(value) {
        this.setState({ gender: value });
    }
    handleChangeDate(date, dateString){
        this.setState({ dob:dateString });
        this.setState({ dateValue:moment(date) });

    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstName,middleName,lastName,dob,gender } = this.state;
        if (firstName.length > 0 && lastName.length > 0 && dob.length > 0) {
            this.props.addAddress({ firstName,middleName,lastName,dob,gender });
            this.setState({ firstName:"",middleName:"",lastName:"",dob:"",dateValue:"",gender:null });
        }
    }

    render() {
        const { firstName,middleName,lastName,gender } = this.state;
        return (
            <div>
                <Row justify="space-around" >
                    <Row justify="start" gutter={[16, 16]}>
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
    })
});

const FormList =  connect(
    null,
    mapDispatchToProps
)(ItemList);

export default FormList;