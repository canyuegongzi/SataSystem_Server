"use strict";
/**
 *日志模型定义
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminLogSchema = new Schema({
    name: String,
    phoneNumber: String,
    date: String,
    log: [{ ip: String, desc: String, date: String }],
    id: Number
});
module.exports = adminLogSchema;
