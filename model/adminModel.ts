/**
 *管理员的模型定义
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminLoginSchema = new Schema({
    name: String,
    phoneNumber: String,
    password: String,
    id: Number,
    root: { type: Number, default: 1.0 },
});
export = adminLoginSchema;