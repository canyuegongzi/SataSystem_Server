import * as express from 'express';
import bodyParser = require('body-parser');
import {adminController} from './controllers/adminController';
import {employeeController} from './controllers/employeeController';
import {dbConnect} from "./controllers/commonController";
import {companyController} from "./controllers/companyController";
import {dataController} from "./controllers/dataController";
import * as path from 'path';

const app = express();
const session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: {maxAge: 60 * 1000 * 5},
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
const connectDb = new dbConnect('mongodb://127.0.0.1:27017/st_manage', '', '');
connectDb.connect();
/*用户的登录注册模块*/
adminController(app);
/*员工*/
employeeController(app);
/*合作伙伴*/
companyController(app);
/*数据*/
dataController(app)
app.listen(8000, '0.0.0.0', () => {
    console.log('服务器已启动 localhost:8000');
});
