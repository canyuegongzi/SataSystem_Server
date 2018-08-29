/**
 *合作伙伴的模型定义
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let companySchema = new Schema({
    name: String,
    desc: String,
    delflag: { type: Number, default: 1 }
});
export = companySchema;