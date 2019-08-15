import React, { Component } from 'react'
import { auth } from '../firebaseconfig';
import { db } from '../firebaseconfig';
// import '../all.css';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            obj: null,
            value: false,
            conformPassword: "",
            show: false,
        }
    }
    signUp = (event) => {
        event.preventDefault();
        var email = document.getElementById('signUpEmail').value;
        var password = document.getElementById('signUpPassword').value;
        var conformPassword = document.getElementById('conformPassword').value;
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        // this.setState({
        var obj = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            conformPassword: conformPassword
        }
        // })
        auth.createUserWithEmailAndPassword(email, password)
            .then(function (res) {
                db.ref().child(res.user.uid).child('personal Information').set(obj)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ...
            });
        document.getElementById('signUpEmail').value = "";
        document.getElementById('signUpPassword').value = "";
        document.getElementById('conformPassword').value = "";
    }
    password = (ev) => {
        var pass = document.getElementById('signUpPassword').value;
        var confopass = document.getElementById('conformPassword').value;
        if (ev.target.name === "conformPassword") {
            this.setState({
                conformPassword: ev.target.value
            })
        }
        if (confopass === pass) {
            console.log(confopass, pass)
            this.setState({
                value: true,

            })
        } else {
            this.setState({
                value: false
            })
        }
    }
    showpass = () => {
        var input = document.getElementById('signUpPassword')
        if (input.type === "text") {
            this.setState({
                show: false,
            })
        }
        if (input.type === "password") {
            this.setState({
                show: true,
            })
        }
    }
    render() {
        return (
            <div className="Form" id="form">
                <h1>Sign Up</h1><br /><br />
                <form id="signupForm" onSubmit={(ev) => {
                    this.signUp(ev)
                    this.props.SignIN()
                }}>

                    <div className="form-row form-group">
                        <div className="col">
                            <input type="text" id="fname" className="form-control" placeholder="First name" />
                        </div>
                        <div className="col">
                            <input type="text" id="lname" className="form-control" placeholder="Last name" />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="email" id="signUpEmail" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input type={`${this.state.show ? "text" : "password"}`} placeholder="Password" id="signUpPassword" className="form-control" />
                        <span id="showPAss">{this.state.show ? <i className="fas fa-eye-slash icon" onClick={() => this.showpass()}></i> : <i className="fas fa-eye icon" onClick={() => this.showpass()}></i>}</span>
                    </div>
                    <div className="form-group">
                        <input name="conformPassword" type="password" onChange={(ev) => this.password(ev)} placeholder="Conform Password" id="conformPassword" className={`form-control ${this.state.value ? "is-valid" : this.state.conformPassword === "" ? null : "is-invalid"}`} />
                    </div>
                    <button className="btn btn-primary  btn-block" >Submit</button>
                    <button className="btn btn-secondary  btn-block" onClick={this.props.SignIN}>Sign In</button><br /><br />
                </form>
            </div>
        )
    }
}
export default Signup