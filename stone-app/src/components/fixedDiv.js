import React from 'react';
import Button from 'react-bootstrap/Button'
class Bottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: ""
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
    render() {

        return (

            <div id="fixed">
                <h1 id="totaldiv">Total : {this.totalprice()}</h1>
                <Button name = {this.totalprice()} variant="danger" onClick={(ev)=>{this.props.handleShow(ev)}}>
                    receive payment
                </Button>
            </div>
        )
    }
}
export default Bottom