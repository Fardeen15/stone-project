import React from 'react';

class List extends React.Component {
    constructor(props){
        super(props)
    }

     

    render() {
        return (
            < tr >
                {/* <td>{this.props.index + 1}</td> */}
                <td>{this.props.value.date}</td>
                <td>{this.props.value.stone}</td>
                <td>{this.props.value.weigth}</td>
                <td>{this.props.value.perkarat}</td>
                <td>{this.props.value.totalprice}</td>
                <td><button name = {this.props.value.date} type="button" onClick={(ev)=>{this.props.handleShow(ev)}} className="btn btn-secondary">View list</button></td>
            </tr >

        )
    }
}
export default List