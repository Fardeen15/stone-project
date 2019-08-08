import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { db } from '../firebaseconfig';

class Print extends Component {
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
        var time = `${fulldate.getMinutes()}${fulldate.getHours()}`
        var merge = `${date}${month}${year}${time}${miliscnd}`
        return merge
    }
    setData = () => {
        var data = this.props.data;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i])
            db.ref().child('data').child(data[i].shopname).child(data[i].date).set(data[i])

        }
    }
    render() {
        console.log(this.props.data)
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Print preview
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ 'overflow': 'scroll' }}>
                    <div id="printDiv">
                        <h3>Shopname</h3>
                        <h5>({this.props.data[0].shopname})</h5>

                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>S no</th>
                                    <th>recipt no</th>
                                    <th>Date</th>
                                    <th>Stone</th>
                                    <th>per CT</th>
                                    <th>Weigth</th>
                                    <th>total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.data ?
                                    this.props.data.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.date}</td>
                                                <td>{value.newDate}</td>
                                                <td>{value.stone}</td>
                                                <td>{value.perkarat}</td>
                                                <td>{value.weigth}</td>
                                                <td>{value.totalprice}</td>
                                            </tr>
                                        )
                                    })
                                    : null}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        this.props.handleClose()
                    }}>Add More Item</Button>
                    <Button variant="primary" onClick={() => {
                        this.setData()
                        this.props.handleClose()
                    }}>Print & Save </Button>
                </Modal.Footer>
            </Modal>


        )
    }
}
export default Print 