let db_connection = require('../../../../../controller/connectiondb');
let userSchema = require('../../../../../model/user')
let config = require("../../../../../config/config");
let common = require("../../../../../controller/common")
let todoSchema = require('../../../../../model/todo')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); 
var CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

// create/edit
module.exports.create_todo_or_edit = async function (req, res) {
  var decodedToken = common.decodedJWT(req.headers.authorization);
    if(decodedToken){
        let connection_db_api = await db_connection.connection_db_api(config.DEFAULT_CONFIG);
        try {
            let requestObject = req.body;
            let todoCollection = connection_db_api.model("todo", todoSchema);

            if(requestObject._id){
            let update_todo = await todoCollection.updateOne(
              {
                user_id: new ObjectId(decodedToken.UserData._id),
               _id: new ObjectId(requestObject._id)
              });
              if(update_todo){
                res.send({ message: 'To do updated successfull', status: true, });
            }else{
                res.send({ message: 'Something Wrong', status: false });
            }
            }else{

              requestObject.created_at = Math.round(new Date().getTime() / 1000);
              requestObject.completed = false;
      
              let add_todo = new todoCollection(requestObject);
              let save_todo = await add_todo.save();
  
              if(save_todo){
                  res.send({ message: 'To do create successfull', status: true, data: save_todo });
              }else{
                  res.send({ message: 'Something Wrong', status: false });
              }
            }
          
           
        } catch (error) {
            console.log("Error", error)
            res.send({ message: "SomethingWrong", error: e, status: false });
        } 
      }else{
       res.send({ message: "Invalid User", status: false });
      }
};

// Todo history day-wise
module.exports.user_todo_history_daywise = async function (req, res) {
  var decodedToken = common.decodedJWT(req.headers.authorization);
  console.log("decodedToken", decodedToken)   

    if(decodedToken){
        let connection_db_api = await db_connection.connection_db_api(config.DEFAULT_CONFIG);
        try {
            let requestObject = req.body;
            let todoCollection = connection_db_api.model("todo", todoSchema);
            // let userId = mongoose.Types.ObjectId(decodedToken.UserData._id);
            let one_todo = await todoCollection.findOne({user_id: new ObjectId(decodedToken.UserData._id), dueDate: requestObject.dueDate})
            console.log("one_todo", one_todo)   
            if(one_todo){
                    res.send({ message: 'To do history daywise', status: true, data: one_todo });
                }else{
                    res.send({ message: 'To do not found', status: false });
                }
           
        } catch (e) {
            console.log("Error", e)
            res.send({ message: "SomethingWrong", error: e, status: false });
        } 
      }else{
       res.send({ message: "Invalid User", status: false });
      }
};

// get specific date
module.exports.todo_daywise = async function (req, res) {
  var decodedToken = common.decodedJWT(req.headers.authorization);

    if(decodedToken){
        let connection_db_api = await db_connection.connection_db_api(config.DEFAULT_CONFIG);
        try {
            let requestObject = req.body;
            let todoCollection = connection_db_api.model("todo", todoSchema);
            let one_todo = await todoCollection.findOne({dueDate: requestObject.dueDate})
            if(one_todo){
                    res.send({ message: 'To do daywise', status: true, data: one_todo });
                }else{
                    res.send({ message: 'To do not found', status: false });
                }
           
        } catch (e) {
            console.log("Error", e)
            res.send({ message: "SomethingWrong", error: e, status: false });
        } 
      }else{
       res.send({ message: "Invalid User", status: false });
      }
};

//set reminder
var send_reminder = new CronJob('* * * * *', async function () {
  try {
    let connection_db_api = await db_connection.connection_db_api(config.DEFAULT_CONFIG);
    let todoCollection = connection_db_api.model("todo", todoSchema);
    let time_now =  Math.round(new Date().getTime() / 1000);
    let one_todo = await todoCollection.findOne({reminderTime: { $lte: time_now}, completed: false})
    if(one_todo){
    // send email
    let smtpOptions = {
      host: "smtp_server",
      port: "smtp_port",
      connectionTimeout: "smtp_timeout" * 10000,
      auth: {
          user: from,
          pass: smtp_password,
          replyTo: smtp_reply_to_mail,
      }
  };
    const transporter = nodemailer.createTransport(smtpOptions);
    let mailvalue = await transporter.sendMail({ from, to, subject, html, replyTo });
    }
  } catch (error) {
    console.log("error", error)
  }
})
send_reminder.start();
