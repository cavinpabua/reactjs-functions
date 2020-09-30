import React, { Component }  from "react";
import { connect } from "react-redux";
import { refreshList } from "./Report.actions";
import {Table} from "antd";

class ReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items:this.props.items,
        };
    }
    componentDidMount() {
        this.props.refreshList();
    }


    render() {
        let columns = [
            {
                title: 'Male',
                dataIndex: 'male',
                key: 'male'
            },
            {
                title: 'Female',
                dataIndex: 'female',
                key: 'female'
            },
            {
                title: 'Other',
                dataIndex: 'other',
                key: 'other'
            },
            {
                title: 'Unknown',
                dataIndex: 'unknown',
                key: 'unknown'
            }
        ]
        return (
            <div >
                <Table dataSource={this.props.items} columns={columns} pagination={{ position: ["bottomCenter"],pageSize: 5 }} scroll={{ x: 500 }} />
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
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportList);
