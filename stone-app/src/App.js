import React from 'react';
import './App.css';
import { db } from './firebaseconfig';
import Table from "./components/table"
import List from './components/viewdata';
import Example from './components/modal';
import Example2 from './components/modal2';
import Bottom from './components/fixedDiv';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Form1 from 'react-bootstrap/Form'
class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      enteries: [],
      getdata: null,
      dataList: null,
      getDataKeys: null,
      modal: false,
      modal2: false,
      enterynumber: '',
      data: null,
      totalprice: null
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
    var karatprice = document.getElementById('karatprice').value;
    var Totalprice = document.getElementById('Totalprice').value;
    var date = new Date()
    var newDate = `${date.getFullYear()}${date.getDate()}${date.getMonth() + 1}${date.getMilliseconds()}`;
    var obj = {
      date: newDate,
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
    db.ref().child('data').child(shopname).child(newDate).set(obj)
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
      console.log(dataList)
    })
  }
  data = (ev) => {
    document.getElementById('table').style.display = 'inline-block'
    document.getElementById('form').style.display = 'none'
    db.ref().child('data').on('value', (snap) => {
      var getDataKeys = Object.keys(snap.val())
      var getData = Object.values(snap.val())
      this.setState({
        getdata: getData,
        getDataKeys: getDataKeys,
        getDataKeys2: getDataKeys
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
  handleClose = () => {
    // const setShow = useState(false);
    // setShow(false);
    this.setState({
      modal: false
    })
  }
  handleClose2 = () => {
    // const setShow = useState(false);
    // setShow(false);
    this.setState({
      modal2: false
    })
  }
  handleShow = (ev) => {
    db.ref().child('data').on('value', (snap) => {
      var wholedata = Object.values(snap.val())
      var obj;

      for (var i = 0; i < wholedata.length; i++) {
        obj = Object.values(wholedata[i]);
        for (var j = 0; j < obj.length; j++) {
          if (obj[j].date === ev.target.name) {
            this.setState({
              data: obj[j]
            })
          }
        }
      }


    })
    this.setState({
      enterynumber: ev.target.name
    })
    this.setState({
      modal: true,
    })
  }
  handleShow2 = (ev) => {
    console.log(ev.target.name)
    this.setState({
      modal2: true,
      totalprice: ev.target.name
    })
  }
  name = (ev) => {
    this.setState({
      getDataKeys: []
    })
    var value = ev.target.value
    setTimeout(() => {
      // if (value) {

      var name = this.state.getDataKeys2;
      var state = this.state.getDataKeys;
      // console.log(ev.target.value)
      let result = name.filter(name => {
        var regex = new RegExp(value, "gi");
        return name.match(regex)
      })
      for (var i = 0; i < result.length; i++) {
        state.push(result[i])
      }
      this.setState({
        getDataKeys: state
      })
      console.log(result)
      // }
    }, 300)
  }

  search = () => {
    console.log('hi')
    document.getElementById('headTr').style.display = 'none'
    document.getElementById('searchTr').style.display = 'block'
    this.setState({
      getDataKeys: []
    })
  }
  render() {
    return (
      <div>
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
            <input type="text" className="form-control" id="weigth" onChange={this.totalprice} />
            <span className="input-group-text" id="karat">CT</span>

          </div>
          <div className="input-group mb-3 select" >
            <div className="input-group-prepend">
              <span className="input-group-text select1" >per CT price</span>
            </div>
            <input type="text" className="form-control" id="karatprice" onChange={this.totalprice} />
          </div>
          <div className="input-group mb-3 select" >
            <div className="input-group-prepend">
              <span className="input-group-text select1" >Total price</span>
            </div>
            <input type="text" className="form-control Totalprice" id="Totalprice" disabled />
          </div>
          <div className="input-group mb-3 select" >
            <button type="button" className="btn btn-secondary" id="submit" onClick={this.submit}>submit</button>
          </div>
          <div className="input-group mb-3 select" >

            <button type="button" className="btn btn-secondary" id="customer" onClick={this.data}>Customers</button>
          </div>
        </div>
        <div id="table">
          <div id="searchTr">
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name='value' type="email" id="searchINP" placeholder="Enter email" onChange={(ev) => this.name(ev)}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2"> <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

          </div>
          <table className="table table-striped table-dark">
            <thead>
              <tr id="headTr">
                <th scope="col" >#</th>
                <th scope="col">Shop Name</th>
                <th scope="col">

                </th>
              </tr>
            </thead>
            <tbody id="tbody">
              {this.state.getDataKeys ?
                this.state.getDataKeys.map((values, index) => {
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
          <div id="addbtn">
            <button type="button" className="btn btn-secondary btn-circle btn-xl" onClick={this.back}><i className="fas fa-plus addicon" ></i>
            </button>
          </div>

        </div>
        <div id="table1">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Recipt no</th>
                <th scope="col">stone</th>
                <th scope="col">Weigth</th>
                <th scope="col">Per ct rate</th>
                <th scope="col">Total price</th>
                <th scope="col"><button type="button" className="btn btn-dark" onClick={this.tablechange}>Back</button></th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataList ?
                this.state.dataList.map((values, index) => {
                  return <List
                    key={index}
                    value={values}
                    index={index}
                    handleShow={this.handleShow}
                  />

                }) : null
              }
            </tbody>
          </table>
          <Example
            data={this.state.data}
            enterynumber={this.state.enterynumber}
            show={this.state.modal}
            handleShow={this.handleShow}
            handleClose={this.handleClose}
          />
          <Bottom
            datalist={this.state.dataList}
            handleShow={this.handleShow2}
          />
          <Example2
            show={this.state.modal2}
            handleShow={this.handleShow2}
            handleClose={this.handleClose2}
            totalprice={this.state.totalprice}
          />
        </div>
      </div >
    );
  }
}

export default Form;
