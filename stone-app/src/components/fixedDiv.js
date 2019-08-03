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
            balance: [],
            values: null
        }
    }

    totalprice = () => {

        var total = 0;
        if (this.props.datalist) {
            this.props.datalist.map((value) => {
                return value.totalprice ? total += Number(value.totalprice) : null

            })
        }
        return total

    }
    date2 = () => {
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
        var miliscnd = fulldate.getMilliseconds();
        console.log(date, month, year)
        var merge = `${date}${month}${year}${miliscnd}`
        return merge
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

    khataClose = (ev) => {
        var name = ev.target.name;
        if (this.totalprice() >= 0) {
            var obj = {
                balance: {
                    totalprice: this.totalprice(),
                    date: this.date()
                }
            }
            console.log(obj)

            db.ref().child('khataBalance').child(name).set(obj).then(() => {
                this.setState({
                    balance: obj
                }, () => {
                    db.ref().child('data').child(name).on('value', (snap) => {
                        if (snap.val()) {

                            var data = Object.values(snap.val())
                            this.setState({
                                values: data
                            })
                        }
                    })
                    db.ref().child('khata').child(name).child(this.date2()).set(this.state.values).then(() => {

                        document.getElementById('table1').style.display = 'none'
                        document.getElementById('table').style.display = 'inline-block'
                        console.log()
                        db.ref().child('data').child(name).remove()
                    })
                })

            })
        }
    }
    render() {
        return (
            <div id="fixed">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>balance</th>
                            <th>
                                <Button name={this.totalprice()} variant="danger" onClick={(ev) => { this.props.handleShow(ev) }}>
                                    receive payment
                                </Button>
                            </th>
                            <th>
                                <Button name={this.props.shopname} variant="danger" onClick={(ev) => { this.khataClose(ev) }}>
                                    KAHTA # 1
                                </Button>
                            </th>
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