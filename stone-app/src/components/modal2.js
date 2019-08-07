import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React from 'react';
import { db } from '../firebaseconfig';
class Example2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: []

        }
    }
    total = () => {
        var value1 = document.getElementById('totalprice').value
        var value2 = document.getElementById('cashpayment').value
        var balnce = value1 - value2
        // if (balnce >= 0) {
            this.setState({
                balance: balnce
            })
        // }

    }
    date = () => {
        var fulldate = new Date()
        var date = fulldate.getDate();
        if(date <= 9){
            date = "0"+ fulldate.getDate()
        }else{
            date = fulldate.getDate()
        }
        var month = fulldate.getMonth() + 1;
        if(month <= 9){
            month = `0${fulldate.getMonth()+1}`
        }else{
            var month = fulldate.getMonth() + 1;
        }

        var year = fulldate.getFullYear();
        console.log(date, month, year)
        var merge = `${date}${month}${year}`
        return merge
    }

    date2 = () => {
        var fulldate = new Date()
        var date = fulldate.getDate();
        if(date <= 9){
            date = "0"+ fulldate.getDate()
        }else{
            date = fulldate.getDate()
        }
        var month = fulldate.getMonth() + 1;
        if(month <= 9){
            month = `0${fulldate.getMonth()+1}`
        }else{
            var month = fulldate.getMonth() + 1;
        }

        var year = fulldate.getFullYear();
        var miliscnd = fulldate.getMilliseconds();
        var time = `${fulldate.getMinutes()}${fulldate.getHours()}`
        var merge = `${date}${month}${year}${time}${miliscnd}`
          return merge
    }

    price = () => {
        var date = document.getElementById('dateInp').value;
        var total = document.getElementById('totalprice').value;
        var cashpayment = document.getElementById('cashpayment').value;
        var obj = {
            date: date,
            total: total,
            totalprice: -cashpayment,
            balance: this.state.balance,
        }
        return obj
    }
    innerhtml = () => {
        document.getElementById('dateInp').value = ""
        document.getElementById('totalprice').value = ""
        document.getElementById('cashpayment').value = ""
        document.getElementById('balance').value = ""
    }
    
    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Receive Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                id="dateInp"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={this.date()}
                                disabled
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Total</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                id="totalprice"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={this.props.totalprice}
                                disabled
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Cash payment</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                id="cashpayment"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={() => {
                                    this.total()
                                }}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Balance</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                className="Totalprice"
                                id="balance"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={this.state.balance}
                                disabled
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.setState({
                                balance: null
                            })
                            this.props.handleClose()
                            this.innerhtml()
                        }
                        }>
                            Close
                        </Button>
                        <Button name={this.props.shopname} variant="primary" onClick={(ev) => {
                            // this.props.data2(ev)
                            db.ref().child('data').child(this.props.shopname).child(this.date2()).set(this.price())
                            db.ref().child('payment').child(this.props.shopname).child(this.date()).set(this.price())
                            this.setState({
                                balance: []
                            })
                            console.log(this.props.datalist)
                            this.innerhtml()
                            this.props.handleClose()
                        }
                        }>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Example2