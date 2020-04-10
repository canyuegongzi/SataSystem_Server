"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var adminController_1 = require("./controllers/adminController");
var employeeController_1 = require("./controllers/employeeController");
var commonController_1 = require("./controllers/commonController");
var companyController_1 = require("./controllers/companyController");
var dataController_1 = require("./controllers/dataController");
var path = require("path");
var app = express();
var session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 1000 * 5 },
}));
app.use('/', express.static(path.join(__dirname, '../', '/WebSystem')));
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
/*数据库的连接*/
var connectDb = new commonController_1.dbConnect('mongodb://127.0.0.1:27017/st_manage', '', '');
connectDb.connect();
/*用户的登录注册模块*/
adminController_1.adminController(app);
/*员工*/
employeeController_1.employeeController(app);
/*合作伙伴*/
companyController_1.companyController(app);
/*数据*/
dataController_1.dataController(app);
app.listen(8000, '0.0.0.0', function () {
    console.log('服务器已启动 localhost:8000');
});
