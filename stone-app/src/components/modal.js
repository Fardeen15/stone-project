import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react';
function Example(props) {
    console.log(props.data)
    return (
        <>
            {props.data ?
                <Modal show={props.show} onHide={props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>DAta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <h4>Date : {props.data.date}</h4> 
                       <h4>stone : {props.data.stone}</h4> 
                       <h4>perCTrate : {props.data.perkarat}</h4> 
                       <h4>Weigth : {props.data.weigth}</h4> 
                       <h4>totalprice : {props.data.totalprice}</h4> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={props.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                : null}
        </>
    );
}

export default Example