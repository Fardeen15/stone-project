import React, { Component } from 'react'
class MainPage extends Component {
    render() {
        return (
            <div id="mainDiv">
                <h1>Main DashBoard </h1>
                <div className="input-group mb-3 select" >
                    <button type="button" className="btn btn-secondary" id="customer" onClick={this.props.changePage}>Add Enties</button>
                </div>
                <div className="input-group mb-3 select" >
                    <button type="button" className="btn btn-secondary" id="customer" onClick={this.props.data}>Customers</button>
                </div>
            </div>

        )
    }
}
export default MainPage