"use strict";
/**
 *管理员的模型定义
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminLoginSchema = new Schema({
    name: String,
    phoneNumber: String,
    password: String,
    id: Number,
    root: { type: Number, default: 1.0 },
});
module.exports = adminLoginSchema;
