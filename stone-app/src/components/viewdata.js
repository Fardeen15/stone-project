import React from 'react';
import { db } from '../firebaseconfig';

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : null
        }
    }
    data = () => {
        if (this.props.value.shopname) {
            db.ref().child('khataBalance').child(this.props.value.shopname).on('value',(snap)=>{
            var value = Object.values(snap.val());
            console.log(value)
            this.setState({
                data : value
            })
            })
        }
    }
    componentWillMount() {
        this.props.total()
        this.data()
    }

    render() {
        return (
            // this.state.data ? 
            // <tr>
            //  <td></td>
            // <td></td>
            // <td>{this.state.data[this.props.index].date}</td>
            // <td colSpan = "2">
            // {this.state.data[this.props.index].totalprice} (previous balance)
            // </td>
            // <td></td>
            // </tr>
            // :
            this.props.value.stone ?
                < tr >
                    <td>{this.props.index + 1}</td>
                    <td>{this.props.value.date}</td>
                    <td>{this.props.value.stone}</td>
                    <td>{this.props.value.weigth}</td>
                    <td>{this.props.value.perkarat}</td>
                    <td>{this.props.value.totalprice}</td>
                    <td></td>
                </tr >
                :
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td>{this.props.value.date}</td>
                    <td>
                        {this.props.value.total}
                        (total)
                </td>
                    <td>
                        {this.props.value.totalprice}
                        (received)
                </td>
                    <td>
                        {this.props.value.balance}
                        (balance)
                </td>
                    <td></td>
                    <td></td>
                </tr>
        )
    }
}
export default List