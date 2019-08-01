import React from 'react';
import './App.css';
import { db } from './firebaseconfig';
import Table from "./components/table"
import List from './components/viewdata';
import Example2 from './components/modal2';
import Bottom from './components/fixedDiv';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormList from './components/formList'
import Form1 from 'react-bootstrap/Form'
import Example from './components/modal1';
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
      totalprice: null,
      value: null,
      shopname: "",
      data: null,
      localgetDataKeys: "seeven star",
      localGetData: [
        {
          201931782: {

            date: "201931782",
            perkarat: "800",
            shopname: "seeven star",
            stone: "یورو رنگ",
            totalprice: "40000",
            weigth: "50CT",
          }
        },
        {

          2019267597: {
            date: "2019267597",
            perkarat: "125",
            shopname: "seeven star",
            stone: "کورین کول",
            totalprice: "750",
            weigth: "6CT"
          }
        }, {

          2019317766: {
            date: "2019317766",
            perkarat: "800",
            shopname: "seeven star",
            stone: "یورو رنگ",
            totalprice: "40000",
            weigth: "50CT",
          }
        }
      ]
    }
  }

  sevenstar
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
    var fulldate = new Date()
    var date = fulldate.getDate();
    if (date <= 9) {
      date = "0" + fulldate.getDate()
    } else {
      date = fulldate.getDate()
    }
    var month = fulldate.getMonth() + 1;
    if (month <= 9) {
      month = `0${fulldate.getMonth()+1}`
    } else {
      var month = fulldate.getMonth() + 1;
    }

    var year = fulldate.getFullYear();
    var miliscnd = fulldate.getMilliseconds();
    console.log(date, month, year)
    var newDate = `${date}${month}${year}${miliscnd}`
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
        dataList: dataList,
        shopname: shopname
      })
      var total = 0;
      // if(dataList.totalprice){

      dataList.map((value) => {

        return value.totalprice ? total += Number(value.totalprice) : null
      })
      // }

      if (total >= 0) {
        var obj = {
          total: total,
        }
      }
      var fulldate = new Date()
      var date = fulldate.getDate();
      if (date <= 9) {
        date = "0" + fulldate.getDate()
      } else {
        date = fulldate.getDate()
      }

      var month = fulldate.getMonth() + 1;
      if (month <= 9) {
        month = `0${fulldate.getMonth()+1}`
      } else {
        var month = fulldate.getMonth() + 1;
      }

      var year = fulldate.getFullYear();
      var merge = `${date}${month}${year}`
      db.ref().child('payment').child(shopname).child(merge).set(obj)
      console.log(total)
    })
  }

  data = (ev) => {
    document.getElementById('table').style.display = 'inline-block'
    document.getElementById('form').style.display = 'none'
    db.ref().child('data').on('value', (snap) => {
      if (snap.val()) {
        var getDataKeys = Object.keys(snap.val())
        var getData = Object.values(snap.val())
        this.setState({
          getdata: getData,
          getDataKeys: getDataKeys,
          getDataKeys2: getDataKeys
        })
        console.log(getData);
        console.log(getDataKeys)
      } else {
        this.setState({
          getdata: this.state.localData,
          getDataKeys: this.state.localData,
          // getDataKeys2: getDataKeys
        })
      }
    })
  }
  back = () => {
    document.getElementById('table').style.display = 'none'
    document.getElementById('form').style.display = 'inline-block'
  }
  tablechange = () => {
    this.setState({
      data: null
    })
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
  balance = (value) => {
    this.setState({
      value: value
    })
  }
  value = () => {


    db.ref().child('payment').child(this.state.shopname).on('value', (snap) => {
      var data = snap.val();
      console.log(data)
      // this.setState({
      //   data: data
      // })
    })

  }


  render() {
    return (
      <div>
        <FormList totalprice={this.totalprice} sumbit={this.submit} data={this.data} handleShow={this.handleShow} />
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
                    total={this.value}
                    handleShow={this.handleShow}
                  />

                }) : null
              }
            </tbody>
          </table>
          <Example
            show={this.state.modal}
            handleShow={this.handleShow}
            handleClose={this.handleClose}
          />
          <Bottom
            value={this.state.value}
            datalist={this.state.dataList}
            data={this.state.data}
            handleShow={this.handleShow2}
            shopname={this.state.shopname}
          />
          <Example2
            balance={this.balance}
            show={this.state.modal2}
            handleShow={this.handleShow2}
            handleClose={this.handleClose2}
            totalprice={this.state.totalprice}
            shopname={this.state.shopname}
            value={this.value}
          />
        </div>
      </div >
    );
  }
}

export default Form;
