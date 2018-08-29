/**
 *author: Marvin
 *@url：数据库连接的链接
 *@user； 数据库的用户名
 *@password： 数据库的密码
 *@connect(): 连接数据库
 */
const request = require('request');
const mongoose = require('mongoose');

export class dbConnect {
    public url: string;
    public user: string;
    public password: string;
    constructor(url: string, user: string, password: string,) {
        this.url = url;
        this.user = user;
        this.password = password;
    }
    public connect() {
        mongoose.connect(this.url, { autoIndex: false, useNewUrlParser:true }, function (err) {
            if(err){
                console.log('Connection Error:' + err);
            }else{
                console.log('Connection success!');
                return true;
            }
        });
        return;
    }
    public disConnect() {
        mongoose.disConnect(function (err) {
            if(err) {
                console.log('disConnect success');
            }else {
                console.log('disConnect fail');
            }
        });
    }
}