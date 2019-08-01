import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { db } from '../firebaseconfig';
class Bottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: [],
            data: null,
        }
    }

    totalprice = () => {
        // if(this.props.shopname){
        //     db.ref().child("payment").child(this.props.shopname).on('value',(snap)=>{
        //         // console.log(snap.val())
        //        var data =  Object.values(snap.val())
        //        for (var i = 0 ; i < data.length; i++){
        //            if(data[i].balance){
        //                this.setState({
        //                    total : data[i].balance
        //                })
        //            }
        //        }
        //     })
        //     console.log(this.state.total)
        // }else{

        var total = 0;
        if (this.props.datalist) {
            this.props.datalist.map((value) => {
                return value.totalprice ? total += Number(value.totalprice) : null

            })
        }
        return total
        // }

    }
    date = () => {
        var fulldate = new Date()
        var date = fulldate.getDate();
        if (date <= 9) {
            date = "0" + fulldate.getDate()
        } else {
            date = fulldate.getDate()
        }
        var month = fulldate.getMonth() + 1;
        if (month <= 9) {
            month = `0${fulldate.getMonth() + 1}`
        } else {
            var month = fulldate.getMonth() + 1;
        }

        var year = fulldate.getFullYear();
        var merge = `${date}${month}${year}`
        return merge
    }
    render() {
        return (
            <div id="fixed">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>balance</th>
                            <th><Button name={this.totalprice()} variant="danger" onClick={(ev) => { this.props.handleShow(ev) }}>
                                receive payment
                </Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data ?
                            this.props.data.map((value, index) => {
                                    return (<tr key={index}>
                                        <td className="classestd">{value.date}</td>
                                        <td className="classestd">{value.total}</td>
                                        <td className="classestd"></td>
                                    </tr>)
                            })
                            :
                            <tr>
                                <td>{this.date()}</td>
                                <td>{this.totalprice()}</td>
                            </tr>}
                    </tbody>
                </Table>

            </div>
        )
    }
}
export default Bottom