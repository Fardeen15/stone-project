import React, { Component } from 'react';

class ViewEntires extends Component {
   
    render() {
        return (
            <div id="printDiv">

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>S no</th>
                            <th>recipt no</th>
                            <th>Date</th>
                            <th>Stone</th>
                            <th>per CT</th>
                            <th>Weigth</th>
                            <th>total price</th>
                            <th><button type="button" className="btn btn-secondary" onClick={() => {
                                this.props.gotoEntry()
                            }}>Back</button></th>
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
                                        <td>
                                            <i className="far fa-edit icon" onClick={(ev) => {
                                                this.props.edit(this.props.data, index)
                                            }}> </i>
                                        </td>
                                        <td>  <i className="fas fa-trash-alt icon" onClick={(ev) => {
                                                console.log('hello')
                                                this.props.delete(index)
                                            }}></i></td>

                                    </tr>
                                )
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ViewEntires