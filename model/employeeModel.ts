/**
 *员工的模型定义
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    job: { type: String, default: ''},
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
    fresh:{ type: Number, default: 1 },
    delflag: { type: Number, default: 1 }
});

export = employeeSchema;

