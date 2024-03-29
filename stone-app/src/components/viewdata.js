import React from 'react';
import { db, auth } from '../firebaseconfig';

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentWillMount() {
        this.props.total()
        console.log(this.props.khata)
    }
    
    render() {
        return (
            // this.props.value ?
            <tbody>
                {!this.props.value.stone && !this.props.value.balance ?
                    <tr>    
                        <td>{this.props.index + 1}</td>
                        <td>-</td>
                        <td>{this.props.value.date}</td>
                        <td>(previous balance)</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{this.props.value.totalprice} </td>
                        <td><button className="btn btn-secondary" name = {this.props.value.date} onClick = {(ev)=>this.props.khata(ev)}>previous Khata</button></td>
                    </tr>
                    : null}
                    {this.props.value.stone ?
                    < tr >
                        <td>{this.props.index + 1}</td>
                        <td>{this.props.value.date}</td>
                        <td>{this.props.value.newDate}</td>
                        <td>{this.props.value.stone}</td>
                        <td>{this.props.value.weigth}CT</td>
                        <td>{this.props.value.perkarat}</td>
                        <td>{this.props.value.totalprice}</td>
                        <td></td>
                    </tr >
                    : this.props.value.balance ?
                        <tr>
                            <td>{this.props.index + 1}</td>
                            <td>-</td>
                            <td>{this.props.value.date}</td>
                            {this.props.value.discount?
                            <td colSpan = "2">{`${this.props.value.total}(total) - ${this.props.value.discount}(discount)`}</td>
                        :<td>(cash received)</td>}
                            
                            <td>-</td>
                           
                            <td>
                                {this.props.value.totalprice}
                                
                             </td>
                             
                             <td></td>
                        </tr>
                        : null}
            </tbody>
            // :null


        )
    }
}
export default List