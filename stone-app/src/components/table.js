// import { db } from './firebaseconfig';
import React from 'react';

class Table extends React.Component {
    render() {
        return (
            < tr >
                <td>{this.props.index + 1}</td>
                <td>{this.props.value}</td>
                <td>
                    <button name = {this.props.value} type="button" onClick = {this.props.viewlist} className="btn btn-secondary">View list</button>
                </td>
            </tr >

        )
    }
}
export default Table