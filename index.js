//import nodemodules
const http = require('http')
const express = require('express')
const app = express()
// const route = express.Router()
const bodyParser = require('body-parser')
// const connection = require('./connection')

// const connection = require('./api/models/connection')

//import route

app.use((req, res, next) =>{
    // const error = new Error("Not found")
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
    next()
})

// bodyparser is deprecate
// app.use(bodyParser.urlencoded({extended : false}))
// app.use(bodyParser.json())
app.use(express.urlencoded(({ extended: true })))
app.use(express.json())


app.use((err, req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(400)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        err: {
            message: err.message
        }
    })
})


var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'tokico'
});
 
connection.getConnection(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


app.post('/information', (req, res) => {
  console.log('DATA: ', req.body)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = "INSERT INTO infomation (number, chokenumber, carnumber, carbrand, carmodel, name, housenumber, village, alley, road, subdistrict, district, province, zipcode, telephonenumber, namestaller, installerdate, installertelephone, installeraddress, zipcodeinstaller, startofinstall) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      // var sql = "INSERT INTO infomation (number, chokenumber) VALUES (?, ?)";
      var value = [req.body.number, req.body.chokenumber, req.body.carnumber, req.body.carbrand, req.body.carmodel, req.body.name, req.body.housenumber, req.body.village, req.body.alley, req.body.road, req.body.subdistrict, req.body.district, req.body.province, req.body.zipcode, req.body.telephonenumber, req.body.namestaller, req.body.installerdate, req.body.installertelephone, req.body.installeraddress, req.body.zipcodeinstaller, req.body.startofinstall]
      // var value = [req.body.number, req.body.chokenumber]
      if (err) throw err
      connection.query(sql, value, (err, result, fields) => {
        console.log('sql queryplan', result)
        console.log(result)
        if (result.affectedRows >= 1) {
          console.log('status200')
          res.status(200).json({
            result: result
          })
        } else {
          console.log('status404')
          res.status(404).json({
            err: err
          })
        } 
      con.release()
      })
    })
    console.log('done selected')
})

app.get('/getinformation', (req, res) => {
  connection.getConnection((err, con) => {
      if (err) throw err
      connection.query("SELECT * FROM infomation", (err, result, fields) => {
        if (err) throw err
        // console.log(result);
        res.json({
          result: result
        })
        con.release()
      })
    })
    console.log('done selected')
})
app.get('/getdetailinformation', (req, res) => {
  connection.getConnection((err, con) => {
      if (err) throw err
      connection.query("SELECT * FROM infomation", (err, result, fields) => {
        if (err) throw err
        // console.log(result);
        res.json({
          result: result
        })
        con.release()
      })
    })
    console.log('done selected')
})
app.get('/information1', (req, res) => {
  connection.getConnection((err, con) => {
      if (err) throw err
      connection.query("SELECT * FROM `infomation` WHERE chokenumber = 'ดฟหดฟหดฟห'", (err, result, fields) => {
        if (err) throw err
        // console.log(result);
        res.json({
          result: result
        })
        con.release()
      })
    })
    console.log('done selected')
})

app.post('/information1', (req, res) => {
  console.log('DATA: ', req.body)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = "SELECT * FROM `infomation` WHERE chokenumber = 'ดฟหดฟหดฟห'";
      // var sql = "INSERT INTO infomation (number, chokenumber) VALUES (?, ?)";
      var value = [req.body.number]
      // var value = [req.body.number, req.body.chokenumber]
      if (err) throw err
      connection.query(sql, value, (err, result, fields) => {
        console.log('sql queryplan', result)
        console.log(result)
        if (result.affectedRows >= 1) {
          console.log('status200')
          res.status(200).json({
            result: result
          })
        } else {
          console.log('status404')
          res.status(404).json({
            err: err
          })
        } 
      con.release()
      })
    })
    console.log('done selected')
})

app.post('/dodata', (req, res) => {
  console.log('DATA: ', req.body)
  console.log('DATA: ', req.body.pallet)
  connection.getConnection((err, con) => {
      if (err) throw err
      console.log("Connected!")
      var sql = "INSERT INTO dodata (doNumber, doItem, doItem2, doKey, CustomerCode, CumtomerName, doDeliveryDate, CustomerReceivingDate, ItemNumber, NumberofBoxes, QtyBox, doQty, AccountNumber, BackNumber, Location, BearingNumber, subBearingNumber, SortKey, CustomerPartsNo, sumdodata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var value = [req.body.doNumber, req.body.doItem, req.body.doItem2, req.body.doKey, req.body.CustomerCode, req.body.CumtomerName, req.body.doDeliveryDate, req.body.CustomerReceivingDate, req.body.ItemNumber, req.body.NumberofBoxes, req.body.QtyBox, req.body.doQty, req.body.AccountNumber, req.body.BackNumber, req.body.Location, req.body.BearingNumber, req.body.subBearingNumber, req.body.SortKey, req.body.CustomerPartsNo, req.body.sumdodata]
      if (err) throw err
      connection.query(sql, value, (err, result, fields) => {
        console.log('sql queryplan')
        console.log(result)
        if (result.length > 0) {
          console.log('status200')
          res.status(200).json({
            result: result
          })
        } else {
          console.log('status404')
          res.status(404).json({
            err: err
          })
        } 
      con.release()
      })
    })
    console.log('done selected')
})

app.get('/getitdata', (req, res) => {
    connection.getConnection((err, con) => {
        if (err) throw err
        connection.query("SELECT * FROM itdata", (err, result, fields) => {
          if (err) throw err
          // console.log(result);
          res.json({
            result: result
          })
          con.release()
        })
      })
      console.log('done selected')
})

app.get('/getdodata', (req, res) => {
  connection.getConnection((err, con) => {
      if (err) throw err
      connection.query("SELECT * FROM dodata", (err, result, fields) => {
        if (err) throw err
        // console.log(result);
        res.json({
          result: result
        })
        con.release()
      })
    })
    console.log('done selected')
})

app.get('/product', (req, res) => {
    res.send('<h1>Hello world</h1>')
    console.log('cc product')
})
app.get('/www', (req, res) => {
    res.send('<h1>Hello world</h1>')
    console.log('cc joinหหหหหห')
})
app.get('/test', (req, res) => {
    res.send('<h1>Hello world</h1>')
    console.log('cc joinหหหหหห')
    http.get('http://119.63.90.135:2083/product', (res) => {
        console.log(res)
    })
})
app.use('/product', express.static('public/img/product'))
app.use('/', express.static('web'))

let ports = process.env.PORT || 4000

const server = app.listen(ports, (req, res, next) => {
    const host = server.address().address
    const port = server.address().port
    console.log('Server run port : ' + port)
})