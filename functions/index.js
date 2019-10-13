const express = require('express')
const app = express()
const cors = require('cors')
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { MealsGetAPI } = require('./meals');
const { GetUserProfile } = require('./users');
const { GetUserSummary } = require('./userSummary');
const { GetSocialData } = require('./social');

app.use(express.json())
app.use(cors())

var serviceAccount = require("./config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dubhacks19-7f555.firebaseio.com"
});

let db = admin.firestore();

app.get("/meals", (req, res) => {
    MealsGetAPI(db.collection("meals"), res);
});

app.get("/getUserProfile", (req, res) => {
    GetUserProfile(req.query.id, db.collection("user"), res);
})

app.get("/getUserSummary", (req, res) => {
    GetUserSummary(req.query.id, db.collection("summary"), res);
});

app.get("/getSocialData", (req, res) => {
    GetSocialData(db.collection("social"), res);
});

exports.widgets = functions.https.onRequest(app);