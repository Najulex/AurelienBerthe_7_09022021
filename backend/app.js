const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const dbConfig = require("./config/db-config");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

   const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: "mysql",
    host: dbConfig.HOST
   });
   
   try {
      sequelize.authenticate();
      console.log('Connecté à la base de données MySQL!');
    } catch (error) {
        console.error('Impossible de se connecter, erreur suivante :', error);
      };

      const UserModel = require('./models/user');
      const User = UserModel(sequelize, Sequelize);

app.post ('/signup',(req,res,next) => {
    User.create({username : req.body.username})
    .then(()=> res.status(201).json({message : "user created"}))
    .catch((err)=> res.status(500).json({err}))
});

app.get ('/login', (req,res,next)=> {
    User.findAll({where: {username : req.body.username}})
    .then((user)=> res.status(200).json({user}))
    .catch((error)=> res.status(500).json({error}))
});

module.exports = app;