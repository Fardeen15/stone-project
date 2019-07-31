import React from 'react'

class FormList extends React.Component {
  constructor(){
    super()
    }
  render() {
    return (
      <div className="Form" id="form">
        <h1>Submit Form</h1>

          <div className="input-group mb-3 select" >
            <div className="input-group-prepend ">
              <span className="input-group-text select1" >Shop Name</span>
            </div>
            <input type="text" className="form-control" id="shopname" />
          </div>

          <div className="input-group mb-3 select">
            <div className="input-group-prepend">
              <label className="input-group-text select1" >stones</label>
            </div>
            <select className="custom-select" id="stone">
              <option>Choose...</option>
              <option>وائٹ چیٹائی</option>
              <option>یورو رنگ</option>
              <option>کورین کول</option>
              <option> یورو چیٹائی </option>
            </select>
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