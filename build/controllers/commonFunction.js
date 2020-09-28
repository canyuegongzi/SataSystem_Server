"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}
exports.getClientIp = getClientIp;
;
function insertData(data, model, phoneNumber) {
    model.updateOne({ 'phoneNumber': phoneNumber }, { $push: { "log": data } }, { 'name': 'admin' }, function (err, docs) {
        console.log(err);
        console.log(docs);
    });
}
exports.insertData = insertData;
function insertDataId(data, model, id) {
    model.updateOne({ 'id': id }, { $push: { "log": data } }, { 'name': 'admin' }, function (err, docs) {
        console.log(err);
        console.log(docs);
    });
}
exports.insertDataId = insertDataId;
function makeCode() {
    var num;
    num = Math.random() * 8000 + 1000;
    return Math.round(num);
}
exports.makeCode = makeCode;
function sendMessage(phone, code) {
    var SMSClient = require('@alicloud/sms-sdk');
    // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
    var accessKeyId = 'LTAIXhOhVpmOA29U';
    var secretAccessKey = 'I1wX3J2kIYcSdRtn5lihpzdj7cZ8oJ';
    //初始化sms_client
    var smsClient = new SMSClient({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
    //发送短信
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '雍飞',
        TemplateCode: 'SMS_140315010',
        TemplateParam: '{"code":' + code + '}'
    }).then(function (res) {
        var Code = res.Code;
        if (Code === 'OK') {
            //处理返回参数
            console.log(res);
            return true;
        }
    }, function (err) {
        console.log(err);
        return false;
    });
}
exports.sendMessage = sendMessage;
function makeDiffId() {
    var date = new Date();
    var num = date.getTime();
    var radom = Math.round((Math.random() * 999 + 1));
    return num + radom;
}
exports.makeDiffId = makeDiffId;
function addData() {
    var data = [];
    data.push();
    return data;
}
exports.addData = addData;
function mockData(max, min) {
    var maxs = max;
    var minx = min;
    var data = [];
    var mock = Math.round((Math.random() * (max - min) + min));
    data.push(mock);
    return data;
}
exports.mockData = mockData;
function Makedata(length) {
    /*声明有个用于存储在线人数总的变量*/
    var line;
    /*封装数据的变量*/
    var res;
    /*声明一个用于存储各项指标的变量*/
    var able = [];
    /*声明在线人数类别的变量*/
    var classes = [];
    /*children*/
    var children = [];
    /*young*/
    var young = [];
    /*middle*/
    var middle = [];
    /*older*/
    var older = [];
    /*classline,各类分别的人数*/
    var classline = [];
    for (var i = 0; i < length + 1; i++) {
        children.push(mockData(500, 0)[0]);
    }
    for (var i = 0; i < length + 1; i++) {
        young.push(mockData(500, 0)[0]);
    }
    for (var i = 0; i < length + 1; i++) {
        middle.push(mockData(500, 0)[0]);
    }
    for (var i = 0; i < length + 1; i++) {
        older.push(mockData(500, 0)[0]);
    }
    for (var i = 0; i <= length; i++) {
        classline[i] = children[i] + young[i] + middle[i] + older[i];
    }
    //console.log(classline)
    for (var i = 0; i < length; i++) {
        classes.push(mockData(500, 0)[0]);
    }
    line = sum(classline);
    able.push(line);
    for (var i = 0; i < length - 1; i++) {
        able.push(mockData(100, 0)[0]);
    }
    res =
        [
            { 'line': line },
            {
                // 'categorynum': classes,
                'classline': classline,
                'children': children,
                'young': young,
                'middle': middle,
                'older': older
            },
            { 'guideline': able },
        ];
    return res;
}
exports.Makedata = Makedata;
function sum(arr) {
    var len = arr.length;
    if (len == 0) {
        return 0;
    }
    else if (len == 1) {
        return arr[0];
    }
    else {
        return arr[0] + sum(arr.slice(1));
    }
}
exports.sum = sum;
function trueFalse() {
    var res;
    var num;
    num = Math.round(Math.random() * 9 + 1);
    if (num >= 5) {
        res = true;
    }
    else {
        res = false;
    }
    return res;
}
exports.trueFalse = trueFalse;
function random(max) {
    return (Math.random() * max).toFixed(3);
}
exports.random = random;
;
/*模拟zoomdata组件的数组数据*/
function makeArr() {
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var data5 = [];
    var data6 = [];
    var data7 = [];
    var random = function (max) {
        return (Math.random() * max).toFixed(3);
    };
    for (var i = 0; i < 100; i++) {
        data1.push([random(100), random(1000), random(1)]);
        data2.push([random(100), random(1000), random(1)]);
        data3.push([random(100), random(1000), random(1)]);
        data4.push([random(100), random(1000), random(1)]);
        data5.push([random(100), random(1000), random(1)]);
        data6.push([random(100), random(1000), random(1)]);
        data7.push([random(100), random(1000), random(1)]);
    }
    return [data1, data2, data3, data4, data5, data6, data7];
}
exports.makeArr = makeArr;
