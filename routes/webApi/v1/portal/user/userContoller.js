let db_connection = require('../../../../../controller/connectiondb');
let userSchema = require('../../../../../model/user')
let config = require("./../../../../../config/config");
let common = require("../../../../../controller/common")

// user register
module.exports.register = async function (req, res) {
    
        let connection_db_api = await db_connection.connection_db_api(config.DEFAULT_CONFIG);
        try {
            let requestObject = req.body;
            let userCollection = connection_db_api.model("users", userSchema);
            console.log("1")
            let userOne = await userCollection.findOne({ useremail: requestObject.useremail});
            console.log("2")

            if(userOne != null){
            console.log("3")

                res.send({ message:"email you're trying to use is already associated with another account.", status: false });
            }else{
                console.log("4")

               let new_password = await common.generateHash(requestObject.password);
                requestObject.created_at = Math.round(new Date().getTime() / 1000);
                requestObject.password = new_password;

                let add_user = new userCollection(requestObject);
                let save_user = await add_user.save();
    
                if(save_user){
                    res.send({ message: 'Register successfull', status: true, data: save_user });
                }else{
                    res.send({ message: 'Something Wrong', status: false });
                }
            }
           
        } catch (error) {
            console.log("Error", error)
            res.send({ message: "SomethingWrong", error: e, status: false });
        } 
};

// user login
module.exports.login = async function (req, res) {
    var requestObject = req.body;
    try {
      let connection_db_api = await db_connection.connection_db_api(config.DEFAULT_CONFIG);
      let userConnection = connection_db_api.model("users", userSchema);

      let UserData = await userConnection.findOne({useremail: requestObject.useremail})
      console.log("UserData", UserData)
      var psss_tnp = await common.validPassword(requestObject.password, UserData.password);

      if (psss_tnp) {
    
        var resLast = {
          token: "",
          UserData,
        };
        var token = await common.generateJWT(resLast);
        resLast.token = token;
        res.send({ message: "User login successfull", data: resLast, status: true });
      } else {
        res.send({ message: "WrongPassword", status: false });
      }
    } catch (e) {
      console.log("Error", e);
      res.send({ message: "SomethingWrong", error: e, status: false });
    }
  };