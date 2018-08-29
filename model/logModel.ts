/**
 *日志模型定义
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminLogSchema = new Schema({
    name: String,
    phoneNumber: String,
    date: String,
    log: [{ip: String, desc: String, date: String}],
    id: Number
});
export = adminLogSchema;
