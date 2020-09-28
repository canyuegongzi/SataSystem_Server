"use strict";
/**
 *用户模型定义
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: { type: String, default: '' },
    sex: { type: Number, default: 1.0 },
    date: String,
    phone: String,
    root: { type: Number, default: 1.0 },
    address: { type: String, default: '' },
    birthday: { type: String, default: '' },
    desc: { type: String, default: '' },
    headphoto: { type: String, default: '' },
    job: { type: String, default: '' },
    id: Number
});
module.exports = userSchema;
