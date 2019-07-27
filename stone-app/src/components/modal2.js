import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React from 'react';
class Example2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: null

        }
    }
    total = ()=>{
        var value1 = document.getElementById('totalprice').value
        var value2 = document.getElementById('cashpayment').value
        var balnce = value1 - value2
        if (balnce >= 0) {
            this.setState({
                balance: balnce
            })
        }

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
                                className = "Totalprice"
                                id="balance"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={this.state.balance}
                                disabled
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                            this.setState({
                                balance : null
                            })
                            this.props.handleClose()}
                            }>
                            Close
                        </Button>
                        <Button name = {this.state.balance} variant="primary" onClick={(ev)=>{
                            this.props.balance(ev.target.name)
                            console.log(ev.target.name)
                            this.setState({
                                balance : null
                            })
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