import { db } from '../firebaseconfig';
import React from 'react';

class Table extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data : null
        }
    }

    render() {
        return (
            < tr >
                <td>{this.props.index + 1}</td>
                <td>{this.props.value}</td>
                <td>
                    <button name={this.props.value} type="button" onClick={(ev) => {
                        this.props.viewlist(ev)
                        this.props.data(ev)
                    }} className="btn btn-secondary">View list</button>
                </td>
            </tr >

        )
    }
}
export default Table