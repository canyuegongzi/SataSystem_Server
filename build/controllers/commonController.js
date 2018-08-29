"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *author: Marvin
 *@url：数据库连接的链接
 *@user； 数据库的用户名
 *@password： 数据库的密码
 *@connect(): 连接数据库
 */
var request = require('request');
var mongoose = require('mongoose');
var dbConnect = /** @class */ (function () {
    function dbConnect(url, user, password) {
        this.url = url;
        this.user = user;
        this.password = password;
    }
    dbConnect.prototype.connect = function () {
        mongoose.connect(this.url, { autoIndex: false, useNewUrlParser: true }, function (err) {
            if (err) {
                console.log('Connection Error:' + err);
            }
            else {
                console.log('Connection success!');
                return true;
            }
        });
        return;
    };
    dbConnect.prototype.disConnect = function () {
        mongoose.disConnect(function (err) {
            if (err) {
                console.log('disConnect success');
            }
            else {
                console.log('disConnect fail');
            }
        });
    };
    return dbConnect;
}());
exports.dbConnect = dbConnect;
