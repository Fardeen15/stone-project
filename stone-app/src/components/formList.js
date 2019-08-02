import React from 'react'
import { db } from '../firebaseconfig';

class FormList extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      stone: null
    }
  }
  data = () => {
    db.ref().child("shopNames").on('value', (snap) => {
      if (snap.val()) {

        var data = Object.keys(snap.val())
        this.setState({
          data: data
        })
      }
    })
  }
  stone = () => {
    db.ref().child("stones").on('value', (snap) => {
      if (snap.val()) {

        var data = Object.keys(snap.val())
        this.setState({
          stone: data
        },()=>{
          console.log(this.state.stone)
        })
      }
    })
  }
  componentWillMount() {
    this.data()
    this.stone()
  }
  render() {
    return (
      <div className="Form" id="form">
        <h1>Submit Form</h1>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend ">
            <span className="input-group-text select1" >Shop Name</span>
          </div>
          <input type="text" list="Sname" className="form-control" id="shopname" />
          <datalist id="Sname">
            {this.state.data ?
              this.state.data.map((value, index) => {
                return <option value={value} key={index} />
              }) : null
            }
          </datalist>
          <span className="input-group-text" id="name" onClick={() => this.props.handleShow()}><i className="fas fa-plus addicon" ></i></span>

        </div>

        <div className="input-group mb-3 select">
          <div className="input-group-prepend">
            <label className="input-group-text select1" >stones</label>
          </div>
          <select className="custom-select" id="stone">
            <option>Choose...</option>
            {this.state.stone ?
              this.state.stone.map((value, index) => {
                return <option key = {index}>{value}</option>
              }) : null
            }
            <option>وائٹ چیٹائی</option>
            <option>یورو رنگ</option>
            <option>کورین کول</option>
            <option> یورو چیٹائی </option>
          </select>
          <span className="input-group-text" id="name" onClick={() => this.props.handleShow2()}><i className="fas fa-plus addicon" ></i></span>

        </div>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend">
            <span className="input-group-text select1" >Weigth</span>
          </div>
          <input type="text" className="form-control" id="weigth" onChange={this.props.totalprice} />
          <span className="input-group-text" id="karat">CT</span>

        </div>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend">
            <span className="input-group-text select1" >per CT price</span>
          </div>
          <input type="text" className="form-control" id="karatprice" onChange={this.props.totalprice} />
        </div>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend">
            <span className="input-group-text select1" >Total price</span>
          </div>
          <input type="text" className="form-control Totalprice" id="Totalprice" disabled />
        </div>
        <div className="input-group mb-3 select" >
          <button type="button" className="btn btn-secondary" id="submit" onClick={this.props.sumbit}>submit</button>
        </div>
        <div className="input-group mb-3 select" >

          <button type="button" className="btn btn-secondary" id="customer" onClick={this.props.data}>Customers</button>
        </div>
      </div>
    )
  }
}

export default FormList