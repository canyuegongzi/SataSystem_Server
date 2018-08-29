"use strict";
/**
 *合作伙伴的模型定义
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var companySchema = new Schema({
    name: String,
    desc: String,
    delflag: { type: Number, default: 1 }
});
module.exports = companySchema;
