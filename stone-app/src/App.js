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
import Example3 from './components/modal3';
import MyVerticallyCenteredModal from './components/centermodal';
import Print from './components/print';
import MyVerticallyCenteredModal2 from './components/shopnameModal';
import MainPage from './components/mainPage';
import ViewEntires from './components/viewEntries';
class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      enteries: [],
      getdata: [],
      dataList: [],
      getDataKeys: [],
      modal: false,
      modal2: false,
      modal3: false,
      modal4: false,
      enterynumber: '',
      // data: null,
      totalprice: [],
      value: [],
      shopname: "",
      data: null,
      baldata: [],
      prebal: [],
      print: false,
      printModaL: false,
      ShopnameModal: false,
      selectedShopname: "",
      form: false,
      table: false,
      mainPage: true,
      table1: false,
      viewentry : false,
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
    var shopname = this.state.selectedShopname;
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
      month = `0${fulldate.getMonth() + 1}`
    } else {
      var month = fulldate.getMonth() + 1;
    }

    var year = fulldate.getFullYear();
    var miliscnd = fulldate.getMilliseconds();
    var time = `${fulldate.getMinutes()}${fulldate.getHours()}`
    var newDate = `${date}${month}${year}${time}${miliscnd}`
    var date = `${date}/${month}/${year}`
    var obj = {
      date: newDate,
      newDate: date,
      shopname: shopname,
      stone: stone,
      weigth: weigth,
      perkarat: karatprice,
      totalprice: Totalprice
    }
    var enteries = this.state.enteries;
    enteries.push(obj);
    this.setState({
      enteries: enteries,
      print: true
    })
    console.log(enteries)
    if (this.state.print) {
      console.log(true)
    }
    // db.ref().child('data').child(shopname).child(newDate).set(obj)
    // document.getElementById('shopname').value = ""
    document.getElementById('stone').value = ""
    document.getElementById('weigth').value = ""
    document.getElementById('karatprice').value = ""
    document.getElementById('Totalprice').value = ""
  }

  viewList = (ev) => {
    this.setState({
      table1: true,
      table: false
    })
    // document.getElementById('table1').style.display = 'inline-block'
    // document.getElementById('table').style.display = 'none'
    var shopname = ev.target.name;
    console.log(shopname)
    db.ref().child('data').child(shopname).on('value', (snap) => {
      if (snap.val()) {
        var dataList = Object.values(snap.val())
        console.log(dataList)
        this.setState({
          dataList: dataList,
          shopname: shopname
        })
      }
      // var total = 0;
      // if (dataList.length) {

      //   dataList.map((value) => {

      //     return value.totalprice ? total += Number(value.totalprice) : null
      //   })
      // }

      // if (total) {
      // var obj = {
      //   total: total,
      // }
      // // }
      // var fulldate = new Date()
      // var date = fulldate.getDate();
      // if (date <= 9) {
      //   date = "0" + fulldate.getDate()
      // } else {
      //   date = fulldate.getDate()
      // }

      // var month = fulldate.getMonth() + 1;
      // if (month <= 9) {
      //   month = `0${fulldate.getMonth() + 1}`
      // } else {
      //   var month = fulldate.getMonth() + 1;
      // }
      // var miliscnd = fulldate.getMilliseconds();
      // var year = fulldate.getFullYear();
      // var time = `${fulldate.getMinutes()}${fulldate.getHours()}`
      // var merge = `${date}${month}${year}${time}${miliscnd}`
      // db.ref().child('payment').child(shopname).child(merge).set(obj)
      // console.log(total)
    })
  }

  data = (ev) => {
    this.setState({
      mainPage: false,
      table: true
    })
    // document.getElementById('table').style.display = 'inline-block'
    // document.getElementById('form').style.display = 'none'
    db.ref().child('data').on('value', (snap) => {
      if (snap.val()) {
        var getDataKeys = Object.keys(snap.val())
        var getData = Object.values(snap.val())
        this.setState({
          getdata: getData,
          getDataKeys: getDataKeys,
          getDataKeys2: getDataKeys
        })
        // console.log(getData);
        // console.log(getDataKeys)
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
    // document.getElementById('table').style.display = 'none'
    // document.getElementById('form').style.display = 'inline-block'
    this.setState({
      table: false,
      form: true,
      selectedShopname: "",
      ShopnameModal: true,
    })
  }
  tablechange = () => {
    // this.setState({
    //   dataList: [],
    // },()=>{
    //   console.log(this.state.dataList)
    // })
    // document.getElementById('tableTbody').innerHTML = ""
    // console.log(this.state.data)
    // if(this.state.dataList.length){
    //   this.setState({
    //     dataList : ""
    //   },()=>{
    //     console.log(true)
    //   })
    // }    
    this.setState({
      data: null,
      table1: false,
      table: true
    })
    // document.getElementById('table1').style.display = 'none'
    // document.getElementById('table').style.display = 'inline-block'
  }
  handleClose = () => {
    // const setShow = useState(false);
    // setShow(false);
    this.setState({
      modal: false
    })
  }
  handleClose3 = () => {
    this.setState({
      modal3: false
    })
  }
  handleClose2 = () => {
    this.setState({
      modal2: false
    })
  }
  handleShow = (ev) => {
    this.setState({
      modal: true,
    })
  }
  handleShow3 = (ev) => {
    this.setState({
      modal3: true,
    })
  }
  handleShow2 = (ev) => {
    console.log(ev.target.name)
    this.setState({
      modal2: true,
      totalprice: ev.target.name
    })
  }
  handleClose4 = () => {
    this.setState({
      modal4: false
    })
  }
  handleShow4 = (ev) => {
    this.setState({
      modal4: true,
    })
  }
  handleClose5 = () => {
    this.setState({
      printModaL: false,
      print: false

    })
  }
  handleShow5 = (ev) => {
    this.setState({
      printModaL: true,
    })
  }
  ShopnameModal = () => {
    this.setState({
      ShopnameModal: false,
    })
  }
  name = (ev) => {
    this.setState({
      getDataKeys: []
    })
    var value = ev.target.value
    setTimeout(() => {
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
    }, 50)
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
  value = (ev) => {
    // db.ref().child('payment').child(this.state.shopname).on('value', (snap) => {
    //   var data = snap.val();
    //   console.log(data)
    //   // this.setState({
    //   //   data: data
    //   // })
    // })
    db.ref().child('khataBalance').on('value', (snap) => {
      //   var prebal = this.state.prebal
      //   var dataList = this.state.dataList
      if (snap.val()) {

        var data = Object.keys(snap.val())
        console.log(data)
        //     for (var i = 0; i < data.length; i++) {
        //       if (data[i] === this.state.shopname && this.state.baldata) {
        //         prebal.push(this.state.baldata[0])
        //         dataList.push(this.state.baldata[0])
        //       }
        //     }
      }
      //   if (prebal.length) {

      //     this.setState({
      //       prebal,
      //       dataList,
      //     })
      //   }
    })
  }
  data2 = (ev) => {
    var name = ev.target.name
    this.setState({
      baldata: [],
      prebal: []
    })

    if (name) {
      db.ref().child('khataBalance').child(name).on('value', (snap) => {
        if (snap.val()) {
          var value = Object.values(snap.val());
          console.log(value)
          this.setState({
            baldata: value
          })
        }
        var prebal = this.state.prebal
        var dataList = this.state.dataList
        db.ref().child('khataBalance').on('value', (snap) => {
          if (snap.val()) {
            var data = Object.keys(snap.val())
            for (var i = 0; i < data.length; i++) {
              console.log(this.state.baldata)
              if (data[i] === name && this.state.baldata.length) {
                setTimeout(() => {
                  db.ref().child('data').child(name).child(this.state.baldata[0].date).set(this.state.baldata[0])
                }, 50)
                // if (prebal.length < 2) {
                //   prebal.push(this.state.baldata[0])
                //   dataList.push(this.state.baldata[0])
                // }
              }
            }
          }
          // if (prebal.length) {
          //   console.log(this.state.baldata, this.state.prebal)
          //   this.setState({
          //     prebal,
          //     dataList,
          //   })
          // }
        })
      })
    }

  }
  getValue = (ev) => {
    console.log()
    this.setState({
      selectedShopname: ev.target.value
    })
  }
  changePage = () => {
    this.setState({
      form: true,
      ShopnameModal: true,
      mainPage: false,
      enteries : [],

    })
  }
  gotoMain = () => {
    this.setState({
      form: false,
      ShopnameModal: false,
      enteries : [],
      mainPage: true
    })
  }
  viewentry = ()=>{
    this.setState({
      form: false,
      viewentry : true
    })
  }
  gotoEntry = ()=>{
    this.setState({
      form: true,
      viewentry : false
    })
  }
  render() {
    return (
      <div>
        {this.state.viewentry ?
          <ViewEntires
            data={this.state.enteries}
            gotoEntry = {this.gotoEntry}
          />
          : null}
        {this.state.mainPage ?
          <MainPage
            data={this.data}
            changePage={this.changePage}
          />
          : null}
        <MyVerticallyCenteredModal2
          handleShow={this.handleShow}
          show={this.state.ShopnameModal}
          handleClose={this.ShopnameModal}
          getValue={this.getValue}
          selectedShopname={this.state.selectedShopname}
          gotoMain={this.gotoMain}

        />
        {this.state.print ?
          <Print
            show={this.state.print}
            handleClose={this.handleClose5}
            data={this.state.enteries}
            selectedShopname={this.state.selectedShopname}

          />
          : null}
        {this.state.form ?
          <FormList
            totalprice={this.totalprice}
            sumbit={this.submit}
            handleShow2={this.handleShow3}
            handleShow3={this.handleShow5}
            entries={this.state.enteries}
            gotoMain={this.gotoMain}
            viewentry = {this.viewentry}
          />
          : null}
        {this.state.table ?
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
                      data={this.data2}
                    />

                  }) :
                  null
                }

              </tbody>
            </table>
            <div id="addbtn">
              <button type="button" className="btn btn-secondary btn-circle btn-xl" onClick={this.back}><i className="fas fa-plus addicon" ></i>
              </button>
            </div>

          </div>
          : null}
        {this.state.table1 ?
          <div id="table1">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Recipt no</th>
                  <th scope="col">Date</th>
                  <th scope="col">stone</th>
                  <th scope="col">Weigth</th>
                  <th scope="col">Per ct rate</th>
                  <th scope="col">Total price</th>
                  <th scope="col"><button type="button" className="btn btn-danger" onClick={this.tablechange}>Back</button></th>
                </tr>
              </thead>
              {this.state.dataList ?
                this.state.dataList.map((values, index) => {
                  return values ? <List
                    key={index}
                    value={values}
                    index={index}
                    data={this.state.baldata ? this.state.baldata : null}
                    total={this.value}
                    handleShow={this.handleShow}
                    data2={this.data2}
                  /> : null

                }) : this.state.localGetData ?
                  this.state.localGetData.map((values, index) => {
                    return <List
                      key={index}
                      value={values}
                      index={index}
                      data={this.state.baldata ? this.state.baldata : null}
                      total={this.value}
                      handleShow={this.handleShow}
                      data2={this.data2}
                    />

                  }) : null
              }
            </table>

            <Bottom
              value={this.state.value}
              datalist={this.state.dataList}
              data={this.state.data}
              handleShow={this.handleShow2}
              data2={this.data2}
              shopname={this.state.shopname}
              handleShow2={this.handleShow4}

            />
            <Example2
              balance={this.balance}
              show={this.state.modal2}
              handleShow={this.handleShow2}
              handleClose={this.handleClose2}
              totalprice={this.state.totalprice}
              shopname={this.state.shopname}
              data2={this.data2}
              datalist={this.state.dataList}
            />
          </div>
          : null}
        <MyVerticallyCenteredModal
          shopname={this.state.shopname}
          dataList={this.state.dataList}
          show={this.state.modal4}
          handleShow={this.handleShow4}
          handleClose={this.handleClose4}
        />
        <Example
          show={this.state.modal}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
        />
        <Example3
          show={this.state.modal3}
          handleShow={this.handleShow3}
          handleClose={this.handleClose3}
        />
      </div >
    );
  }
}

export default Form;
