"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *author: Marvin
 *@adminController：管理员登录的处理路由
 *@'/': 测试路由
 *@'/api/login': 管理员的登录处理路由
 *@'/api/register': 管理员的注册处理路由
 *@'/api/regnumber': 验证码处理
 *@'/api/user': 用户详情
 *@'/api/editpass': 修改用户密码
 *@'/api/edituser'： 修改用户信息
 *@'/api/loginlog': 操作日志
 *@'/api/changeroot': 权限修改,是否有的登录的权限或是路由的权限
 *@'/api/rootuser': 所有的用户
 */
var commonFunction_1 = require("./commonFunction");
var adminLoginSchema = require("../model/adminModel");
var adminLogSchema = require("../model/logModel");
var userSchema = require("../model/userModel");
/*公共框架*/
var mongoose = require('mongoose');
function adminController(app) {
    var _this = this;
    /*登录用户的约束*/
    var adminUserSchema = adminLoginSchema;
    /*用户日志约束*/
    var LogSchema = adminLogSchema;
    /*用户详情约束*/
    var UserSchema = userSchema;
    /*用户的模型*/
    var AdminUserModel = mongoose.model('st_loginadmins', adminUserSchema);
    /*日志的模型*/
    var AdminLogModel = mongoose.model('st_logs', LogSchema);
    /*用户详情模型*/
    var UserDetailModel = mongoose.model('st_userdetails', UserSchema);
    /*日志操作*/
    var log;
    var message;
    /*路由配置*/
    app.get('/', function (req, res) {
        AdminUserModel.find({ name: '18660683370' }, 'name -_id', function (err, docs) {
            if (!err) {
                //res.send(docs);
            }
            return;
        });
    });
    app.post('/api/login', function (req, res) {
        var params = JSON.parse(JSON.stringify(req.body)).params;
        /*let params = {
            phone: "18660683370",
            password: "123456789"
        }*/
        var ip = commonFunction_1.getClientIp(req);
        var admin = null;
        AdminUserModel.findOne({ phoneNumber: params.phone }, function (err, docs) {
            if (!err) {
                if (!docs) {
                    return res.json({ status: false, date: new Date(), message: 'noperson', ip: ip });
                }
                else {
                    /*莫名出错，只能两次转换数据格式，啥玩意儿*/
                    var adminmessage = JSON.stringify(docs);
                    _this.admin = JSON.parse(adminmessage);
                    if (_this.admin.phoneNumber == params.phone && _this.admin.password == params.password) {
                        res.json({ status: true, date: new Date(), message: 'ok ', data: [docs], ip: ip });
                        _this.log = { ip: ip, desc: '登录成功', date: new Date };
                        commonFunction_1.insertData(_this.log, AdminLogModel, _this.admin.phoneNumber);
                    }
                    else {
                        _this.log = { ip: ip, desc: '登录失败', date: new Date };
                        commonFunction_1.insertData(_this.log, AdminLogModel, _this.admin.phoneNumber);
                        return res.json({ status: false, date: new Date(), message: 'error', ip: ip });
                    }
                }
            }
            else {
                _this.log = { ip: ip, desc: '登录失败', date: new Date };
                commonFunction_1.insertData(_this.log, AdminLogModel, _this.admin.phoneNumber);
                return res.json({ status: false, date: new Date(), message: 'error', ip: ip });
            }
        });
    });
    app.post('/api/register', function (req, res) {
        //console.log(req.session.message);
        var params = JSON.parse(JSON.stringify(req.body)).params;
        var ip = commonFunction_1.getClientIp(req);
        if (req.session.message /*message*/) {
            if (Number(params.message) == Number(message)) {
                AdminUserModel.find({ 'phoneNumber': params.phone }, function (err, docs) {
                    var id = commonFunction_1.makeDiffId();
                    if (!err) {
                        if (docs.length == 0) {
                            AdminUserModel.create({
                                name: params.phone,
                                password: params.password,
                                phoneNumber: params.phone,
                                id: id
                            }, function (err, docs) {
                                if (!err) {
                                    UserDetailModel.create({
                                        name: params.phone,
                                        date: new Date().toLocaleDateString(),
                                        phone: params.phone,
                                        id: id
                                    }, function (err, docs) {
                                        if (!err) {
                                            _this.log = { ip: ip, desc: '注册成功', date: new Date };
                                            AdminLogModel.create({
                                                name: params.phone,
                                                phoneNumber: params.phone,
                                                date: new Date(),
                                                log: [_this.log],
                                                id: id
                                            }, function (err, docs) {
                                                //commonFunction.insertData(this.log, AdminLogModel, this.admin.phoneNumber);
                                                return res.json({
                                                    status: true,
                                                    date: new Date(),
                                                    message: 'succcess',
                                                    ip: ip
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else if (docs.length != 0) {
                            return res.json({ status: false, date: new Date(), message: 'hasuser', ip: ip });
                        }
                    }
                });
            }
        }
        else {
            return res.json({ status: false, date: new Date(), message: 'messageerror', ip: ip });
        }
    });
    app.post('/api/regnumber', function (req, res) {
        var params = JSON.parse(JSON.stringify(req.body)).params;
        var phoneCode = commonFunction_1.makeCode();
        message = phoneCode;
        commonFunction_1.sendMessage(params, phoneCode);
        req.session.message = phoneCode;
        res.json({ status: true });
    });
    app.get('/api/user', function (req, res) {
        var id = req.query.id;
        var name = req.query.name;
        //let id = 1533275117760;
        UserDetailModel.findOne({ 'id': Number(id) }, function (err, docs) {
            if (!err) {
                return res.json(docs);
            }
        });
    });
    app.post('/api/editpass', function (req, res) {
        var ip = commonFunction_1.getClientIp(req);
        var params = JSON.parse(JSON.stringify(req.body)).params;
        /*let params = {oldpass: '123456',
            newpass: '123456789',
            id: '1533275117760',
            name: '18660683370' }*/
        AdminUserModel.findOne({ 'id': Number(params.id) }, function (err, docs) {
            //console.log(docs)
            if (!err) {
                if (params.oldpass != docs.password) {
                    return res.json({ status: 'different', date: new Date() });
                }
                else if (params.newpass == docs.password) {
                    return res.json({ status: 'same', date: new Date() });
                }
                else {
                    AdminUserModel.updateOne({ 'id': Number(params.id) }, { $set: { 'password': params.newpass } }, function (err, docs) {
                        if (!err) {
                            res.json({ status: true, date: new Date(), message: 'ok', data: docs, ip: ip });
                            _this.log = { ip: ip, desc: '修改密码成功', date: new Date };
                            commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                        }
                        else {
                            res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
                            _this.log = { ip: ip, desc: '修改密码失败', date: new Date };
                            commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                        }
                    });
                }
            }
            else {
                res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
                _this.log = { ip: ip, desc: '修改密码失败', date: new Date };
                commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
            }
        });
    });
    app.post('/api/edituser', function (req, res) {
        var ip = commonFunction_1.getClientIp(req);
        var params = JSON.parse(JSON.stringify(req.body)).params;
        console.log(params);
        /*let params = {
            name: '18660683370',
            sex: 1,
            date: '2018年08月-04日',
            phone: '18660683370',
            root: 1,
            address: '',
            birthday: '',
            desc: '',
            headphoto: '',
            job: 'kkkk',
            id: '1533275117760'
        }*/
        AdminUserModel.findOne({ 'id': Number(params.id) }, function (err, docs) {
            if (!docs) {
                res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
            }
            else {
                AdminUserModel.updateOne({ 'id': Number(params.id) }, {
                    $set: {
                        name: params.name,
                        phoneNumber: params.phone
                    }
                }, function (err, docs) {
                    if (!err) {
                        UserDetailModel.updateOne({ 'id': Number(params.id) }, {
                            $set: {
                                name: params.name,
                                sex: params.sex,
                                date: params.date,
                                phone: params.phone,
                                address: params.address,
                                birthday: params.birthday,
                                desc: params.desc,
                                headphoto: params.headphoto,
                                job: params.job,
                            }
                        }, function (err, docs) {
                            if (!err) {
                                res.json({ status: true, date: new Date(), message: 'ok', data: docs, ip: ip });
                                _this.log = { ip: ip, desc: '修改信息成功', date: new Date };
                                commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                            }
                            else {
                                res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
                                _this.log = { ip: ip, desc: '修改信息失败', date: new Date };
                                commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                            }
                        });
                    }
                    else {
                        res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
                        _this.log = { ip: ip, desc: '修改信息失败', date: new Date };
                        commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                    }
                });
            }
        });
    });
    app.get('/api/loginlog', function (req, res) {
        /*前台传参格式写成了数组*/
        var id = req.query[0];
        //const id = 1533275117760;
        //const page = 2;
        var name = req.query[1];
        var page = req.query[2];
        var loginlogone;
        AdminLogModel.findOne({ 'id': Number(id) }, { 'log': 1, '_id': 0 }, function (err, docs) {
            // !err? res.json(docs): res.json('error');
            if (!err) {
                loginlogone = (docs.log).slice(5 * ((page) - 1), (((page) - 1) + 1) * 5);
                res.json({ data: loginlogone, total: (docs.log).length });
            }
            else {
                res.json({ status: false });
            }
        });
    });
    app.get('/api/rootuser', function (req, res) {
        UserDetailModel.count({ 'root': { $gt: 0 } }, function (err, count) {
            if (!err) {
                if (req.query.page) {
                    UserDetailModel.find({}, function (err, docs) {
                        !err ? res.json({ data: docs, total: count, message: 'ok', statue: true }) : res.json({ message: 'error', statue: false });
                    }).skip(req.query.page - 1).limit(10);
                }
                else {
                    res.json({ message: 'error', statue: false });
                }
            }
        });
    });
    app.post('/api/changeroot', function (req, res) {
        var params = JSON.parse(JSON.stringify(req.body)).params;
        var ip = commonFunction_1.getClientIp(req);
        UserDetailModel.updateOne({ 'id': Number(params.id) }, { $set: { 'root': params.root } }, function (err, docs) {
            if (!err) {
                AdminUserModel.updateOne({ 'id': Number(params.id) }, { $set: { 'root': params.root } }, function (err, docs) {
                    if (!err) {
                        if (params.root == 2) {
                            _this.log = { ip: ip, desc: '修改权限成功', date: new Date };
                            commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                            res.json({ status: true, date: new Date(), message: 'ok', data: docs, ip: ip });
                        }
                        else if (params.root == 0) {
                            _this.log = { ip: ip, desc: '禁用用户成功', date: new Date };
                            commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                            res.json({ status: true, date: new Date(), message: 'ok', data: docs, ip: ip });
                        }
                    }
                    else {
                        res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
                        _this.log = { ip: ip, desc: '修改权限失败', date: new Date };
                        commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
                    }
                });
            }
            else {
                res.json({ status: false, date: new Date(), message: 'error', data: docs, ip: ip });
                _this.log = { ip: ip, desc: '修改权限失败', date: new Date };
                commonFunction_1.insertDataId(_this.log, AdminLogModel, Number(params.id));
            }
        });
    });
}
exports.adminController = adminController;
