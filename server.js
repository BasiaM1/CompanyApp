const express = require('express');
const cors = require('cors');
const app = express();
const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true},
  (err, client) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Successfully connected to the database');
      const db = client.db('companyDB');
      // db.collection('employees').find({ department: 'IT' }).toArray((err, data) => {
      //   if (!err) {
      //     console.log(data)
      //   }
      // });
      // db.collection('departments').insertOne({ name: 'Management' }, err => {
      //   if (err) console.log('err');
      // });
      // // db.collection('employees').updateOne({ department: 'IT' }, { $set: { salary: 6000 } }, err => {
      // //   if (err) console.log(err);
      // // });
      // db.collection('employees').deleteOne({ salary: 6000 }, (err) => {
      //   if (err) console.log(err);
      // });
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({extended: false}));
      app.use((req, res, next) => {
        req.db = db;
        next();
      });
      app.use('/api', employeesRoutes);
      app.use('/api', departmentsRoutes);
      app.use('/api', productsRoutes);

      app.use((req, res) => {
        res.status(404).send({message: 'Not found...'});
      })

      app.listen('8000', () => {
        console.log('Server is running on port: 8000');
      });
    }
  });


const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

