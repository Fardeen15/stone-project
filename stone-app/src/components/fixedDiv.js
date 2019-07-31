import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { db } from '../firebaseconfig';
class Bottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: "",
            data: null
        }
    }
    totalprice = () => {
        var total = 0;
        if (this.props.datalist) {
            this.props.datalist.map((value) => {
                return total += Number(value.totalprice)

            })
        }
        return total

    }
    date = () => {
        var fulldate = new Date()
        var date = fulldate.getDate();
        var month = fulldate.getMonth() + 1;
        var year = fulldate.getFullYear();
        console.log(date, month, year)
        var merge = `${date}${month}${year}`
        return merge
    }
    render() {
        console.log(this.props.data)
        return (
            <div id="fixed">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total</th>
                            <th>receive payment</th>
                            <th>balance</th>
                            <th><Button name={this.totalprice()} variant="danger" onClick={(ev) => { this.props.handleShow(ev) }}>
                                receive payment
                </Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data ?
                            this.props.data.map((value,index) => {
                                console.log(value)
                                return(<tr key= {index}>
                                    <td>{value.date}</td>
                                    <td>{value.total}</td>
                                    <td>({value.receivepayment})</td>
                                    <td>{value.balance}</td>
                                </tr>)
                            })
                            :
                            <tr>
                                <td>cvsdgyusdah</td>
                                <td>{this.totalprice()}</td>
                            </tr>}
                    </tbody>
                </Table>

            </div>
        )
    }
}
export default Bottom