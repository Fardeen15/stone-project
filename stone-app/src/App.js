import React from 'react';
import './App.css';
import { db } from './firebaseconfig';
import Table from "./components/table"
import List from './components/viewdata';
class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      enteries: [],
      getdata: null,
      dataList: null,
    }
  }
  totalprice = () => {
    var weigth = document.getElementById('weigth').value;
    var karatprice = document.getElementById('karatprice').value;
    document.getElementById('Totalprice').value = weigth * karatprice
  }


  submit = () => {
    var shopname = document.getElementById('shopname').value;
    var stone = document.getElementById('stone').value;
    var weigth1 = document.getElementById('weigth').value;
    var weigth = weigth1 + document.getElementById('karat').innerHTML
    // var quantity = document.getElementById('quantity').value;
    var karatprice = document.getElementById('karatprice').value;
    var Totalprice = document.getElementById('Totalprice').value;
    var obj = {
      shopname: shopname,
      stone: stone,
      weigth: weigth,
      perkarat: karatprice,
      totalprice: Totalprice
    }
    var enteries = this.state.enteries;
    enteries.push(obj);
    this.setState({
      enteries: enteries
    })
    console.log(enteries)
    db.ref().child('data').child(shopname).child('data').set(obj)
    document.getElementById('shopname').value = ""
    document.getElementById('stone').value = ""
    document.getElementById('weigth').value = ""
    document.getElementById('karatprice').value = ""
    document.getElementById('Totalprice').value = ""
  }

  viewList = (ev) => {
    document.getElementById('table1').style.display = 'inline-block'
    document.getElementById('table').style.display = 'none'

    var shopname = ev.target.name;
    db.ref().child('data').child(shopname).on('value', (snap) => {
      var dataList = Object.values(snap.val())
      this.setState({
        dataList: dataList
      })
    })
    console.log(this.state.dataList)

  }
  data = (ev) => {
    document.getElementById('table').style.display = 'inline-block'
    document.getElementById('form').style.display = 'none'
    db.ref().child('data').on('value', (snap) => {
      var getData = Object.values(snap.val())
      this.setState({
        getdata: getData
      })
    })
  }
  back = () => {
    document.getElementById('table').style.display = 'none'
    document.getElementById('form').style.display = 'inline-block'
  }
  tablechange = () => {
    document.getElementById('table1').style.display = 'none'
    document.getElementById('table').style.display = 'inline-block'

  }
  render() {
    return (
      <div>
        <div className="Form" id="form">
          <h1>Submit Form</h1>
          <div className="input-group mb-3 select" >
            <div className="input-group-prepend">
              <span className="input-group-text" >Shop Name</span>
            </div>
            <input type="text" className="form-control" id="shopname" />
          </div>
          <div className="input-group mb-3 select">
            <div className="input-group-prepend">
              <label className="input-group-text" >stones</label>
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
              <span className="input-group-text" >Weigth</span>
            </div>
            <input type="text" className="form-control" id="weigth" onChange={this.totalprice} />
            <span className="input-group-text" id="karat">CT</span>

          </div>
          <div className="input-group mb-3 select" >
            <div className="input-group-prepend">
              <span className="input-group-text" >per CT price</span>
            </div>
            <input type="text" className="form-control" id="karatprice" onChange={this.totalprice} />
          </div>
          <div className="input-group mb-3 select" >
            <div className="input-group-prepend">
              <span className="input-group-text" >Total price</span>
            </div>
            <input type="text" className="form-control" id="Totalprice" disabled />
          </div>
          <div className="input-group mb-3 select" >

            <button type="button" className="btn btn-secondary" id="submit" onClick={this.submit}>submit</button>
            <button type="button" className="btn btn-secondary" id="customer" onClick={this.data}>Customers</button>
          </div>
        </div>
        <div id="table">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Shop Name</th>
                <th scope="col"><button type="button" className="btn btn-light" onClick={this.back}>Add Entry</button></th>
              </tr>
            </thead>
            <tbody id="tbody">
              {this.state.getdata ?
                this.state.getdata.map((values, index) => {
                  console.log(this.state.getdata)
                  return <Table
                    key={index}
                    value={values}
                    index={index}
                    viewlist={this.viewList}
                  />

                }) : null
              }

            </tbody>
          </table>
        </div>
        <div id="table1">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">stone</th>
                <th scope="col">Weigth</th>
                <th scope="col">Per ct rate</th>
                <th scope="col">Total price</th>
                <th scope="col"><button type="button" className="btn btn-dark" onClick = {this.tablechange}>Back</button></th>
              </tr>
            </thead>
            <tbody>
            {this.state.dataList ?
                this.state.dataList.map((values, index) => {
                  console.log(values)
                  return <List
                    key={index}
                    value={values}
                    index={index}
                    viewlist={this.viewList}
                  />

                }) : null
              }
            </tbody>
          </table>
        </div>
      </div >
    );
  }
}

export default Form;
