const mongoose = require("mongoose")

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;


const connect = () => {
    mongoose.connect(`mongodb+srv://{ ${dbUser}:${dbPassword}@users.7vz5gty.mongodb.net/`);

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Error connecting to mongoDB");
    })

    connection.on("open", () => {
        console.log("connected to mongoDB!")
    })
}

connect();

module.exports = mongoose;