"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*半成品*/
var AdminUser = /** @class */ (function () {
    function AdminUser(job, reach, phone, star, demerit, id, name, age, sex, headphoto, Id_no, date, code, root, fresh) {
        this.job = job;
        this.reach = reach;
        this.phone = phone;
        this.star = star;
        this.demerit = demerit;
        this.id = id;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.headphoto = headphoto;
        this.Id_no = Id_no;
        this.date = date;
        this.code = code;
        this.root = root;
        this.fresh = fresh;
    }
    return AdminUser;
}());
exports.AdminUser = AdminUser;
var DetailAdmin = /** @class */ (function () {
    function DetailAdmin(id, identity, address, experience, demerits, deal, fresh) {
        this.id = id;
        this.identity = identity;
        this.address = address;
        this.experience = experience;
        this.demerits = demerits;
        this.deal = deal;
        this.fresh = fresh;
    }
    return DetailAdmin;
}());
exports.DetailAdmin = DetailAdmin;
var Log = /** @class */ (function () {
    function Log(name, date, phoneNumber, log) {
        this.name = name;
        this.date = date;
        this.phoneNumber = phoneNumber;
        this.log = log;
    }
    return Log;
}());
exports.Log = Log;
var SysDetail = /** @class */ (function () {
    function SysDetail(id, time, degree, desc, cure, who, area, solveAdvice, upperAdvice) {
        this.id = id;
        this.time = time;
        this.degree = degree;
        this.desc = desc;
        this.cure = cure;
        this.who = who;
        this.area = area;
        this.solveAdvice = solveAdvice;
        this.upperAdvice = upperAdvice;
    }
    return SysDetail;
}());
exports.SysDetail = SysDetail;
/*具体的分析*/
var SysWriteData = /** @class */ (function () {
    function SysWriteData(area, press, bugtime, needOptimize, relevance, bugCan, cureCan, hows) {
        this.area = area;
        this.press = press;
        this.bugtime = bugtime;
        this.needOptimize = needOptimize;
        this.relevance = relevance;
        this.bugCan = bugCan;
        this.cureCan = cureCan;
        this.hows = hows;
    }
    return SysWriteData;
}());
exports.SysWriteData = SysWriteData;
/*产生大量的人员数据的*/ 
