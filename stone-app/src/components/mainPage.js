import React, { Component } from 'react'
import {db, auth } from '../firebaseconfig';
class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : "",
            useruid : ""
        }
    }
    componentWillMount(){
        auth.onAuthStateChanged((user)=>{
            if(user){
                db.ref().child(user.uid).child("personal Information").on("value",(snap)=>{
                    var data = snap.val()
                    this.setState({
                        email : data.email,
                        useruid : user.uid
                    })
                })
            }
        })
    }
    render() {
        console.log(this.props)
        return (
            <div id="mainDiv">
                <h1>Main DashBoard </h1>
                <h5>Sign In As : ({this.state.email})</h5>
                <div className="input-group mb-3 select" >
                    <button type="button" className="btn btn-secondary" id="customer" onClick={this.props.changePage} disabled = {this.state.useruid ? false : true}>Add Enties</button>
                </div>
                <div className="input-group mb-3 select" >
                    <button type="button" className="btn btn-secondary" id="customer" onClick={this.props.data} disabled = {this.state.useruid ? false : true}>Customers</button>
                </div>
                <div className="input-group mb-3 select" >
                    <button type="button" className="btn btn-secondary" id="customer" onClick = {this.props.signOut} disabled = {this.state.useruid ? false : true}>sign out</button>
                </div>
            </div>

        )
    }
}
export default MainPage