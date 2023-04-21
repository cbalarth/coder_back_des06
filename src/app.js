import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

import {__dirname} from "./utils.js";
import {AuthRouter} from "./routes/auth.routes.js";
import {WebRouter} from "./routes/web.routes.js";
import mongoose from "mongoose";

const app = express();
const database="mongodb+srv://cbalart96:mongocoder123@codercluster.jhyle2f.mongodb.net/mongosessions?retryWrites=true&w=majority";
mongoose.connect(database);

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//CONFIGURA SESSION
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: database,
            ttl: 600,
        }),
        secret:"claveSecreta",
        resave:true,
        saveUninitialized:true
    })
);

//HANDLEBARS
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//ROUTES
app.use("/", WebRouter);
app.use("/api/sessions", AuthRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080.");
});