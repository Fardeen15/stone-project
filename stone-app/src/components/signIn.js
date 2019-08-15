import React, { Component } from 'react'
import { auth } from '../firebaseconfig';
// import '../all.css';
class SignIN extends Component {

    constructor() {
        super()
        this.state = {
            show : false,
        }
    }


    signIn = (event) =>{
        event.preventDefault()
        var email = document.getElementById("email").value;
        var password = document.getElementById('password').value;
        console.log(email,password)
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log("hi");
                this.props.mainPage()

            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            })
    }
    showpass = ()=> {
        var input = document.getElementById('password')
        if(input.type === "text"){
            this.setState({
                show : false,
            })
        }
        if(input.type === "password"){
            this.setState({
                show : true,
            })
        }
    }

    render() {
        return (
            <div className="Form" id="form">
                <h1>Sign In</h1> <br/><br/>
                <form id = "signupForm" onSubmit={(ev) => {
                    // ev.preventDefault()
                    this.signIn(ev)
                }}>
                    <div className="form-group ">
                        {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                        <input type="email" id="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group ">
                        {/* <label htmlFor="exampleInputPassword1">Password</label> */}
                        <input type={`${this.state.show ? "text" : "password"}`}className="form-control"  id="password" placeholder="Password" />
                        <span id = "showPAss">{this.state.show ? <i className="fas fa-eye-slash icon" onClick = {()=>this.showpass()}></i> : <i className="fas fa-eye icon" onClick = {()=>this.showpass()}></i>}</span>

                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <button className="btn btn-secondary btn-block" onClick={this.props.signup}>sign Up</button>

                </form>
            </div>



        )
    }
}
export default SignIN