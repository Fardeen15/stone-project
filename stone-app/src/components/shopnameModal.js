import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react';
import { db, auth } from '../firebaseconfig';


class MyVerticallyCenteredModal2 extends React.Component {
    constructor() {
        super()
        this.state = {
            data: null,
        }
    }
    data = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child(user.uid).child("shopNames").on('value', (snap) => {
                    if (snap.val()) {

                        var data = Object.keys(snap.val())
                        this.setState({
                            data: data
                        })
                    }
                })
            }
        })
    }
    componentWillMount() {
        this.data()

    }

    render() {
        return (
            <Modal
                show={this.props.show} onHide={() => {
                    if (this.props.selectedShopname) {
                        this.props.handleClose()
                    } else {
                        this.props.gotoMain()
                    }
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select Shop Name
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3 " >
                        <div className="input-group-prepend ">
                            <span className="input-group-text font" >Shop Name</span>
                        </div>
                        <input type="text" list="Sname" className="form-control" id="shopname" onChange={(ev) => this.props.getValue(ev)} required />
                        <datalist id="Sname">
                            {this.state.data ?
                                this.state.data.map((value, index) => {
                                    return <option value={value} key={index} />
                                }) : null
                            }
                        </datalist>
                        <span className="input-group-text" id="name" onClick={() => {
                            this.props.handleShow()
                            document.getElementById('shopname').value = ""
                        }}><i className="fas fa-plus addicon2" ></i></span>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!this.props.selectedShopname} variant='secondary' name={this.props.shopname} onClick={(ev) => {
                        this.props.handleClose(ev)
                    }}>Go...</Button>
                </Modal.Footer>
                {/* <div id="addbtn2">
                    <button type="button" className="btn btn-secondary btn-circle2 btn-xl2" onClick={this.props.gotoMain}><i className="fas fa-arrow-left addicon"></i>
                    </button>
                </div> */}


            </Modal>
        );
    }
}

export default MyVerticallyCenteredModal2