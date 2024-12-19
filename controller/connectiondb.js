const mongoose = require('mongoose');

module.exports.connection_db_api = async function (reqData) {
    var url = "mongodb://";
    url += reqData.DB_HOST + ":" + reqData.DB_PORT + "/" + reqData.DB_NAME;
    var connnection = await mongoose.createConnection(url);
    return connnection;
};