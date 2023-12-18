const mongoose = require("mongoose");

exports.connectDataBase = () => {
    mongoose
        .connect("mongodb://localhost:27017/Social_media")
        .then((con) => console.log(`DataBase is Connected ${con.connection.host}`))
        .catch((err) => console.log(err));
};
