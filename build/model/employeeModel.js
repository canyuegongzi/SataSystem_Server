"use strict";
/**
 *员工的模型定义
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    job: { type: String, default: '' },
    reach: String,
    phone: String,
    star: { type: Number, default: 0 },
    demerit: { type: Number, default: 0 },
    id: Number,
    name: String,
    age: Number,
    sex: Number,
    headphoto: { type: String, default: '' },
    Id_no: String,
    date: String,
    code: String,
    root: { type: Number, default: 1 },
    fresh: { type: Number, default: 1 },
    delflag: { type: Number, default: 1 }
});
module.exports = employeeSchema;
