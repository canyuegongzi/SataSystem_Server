/**
 *用户模型定义
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
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
export = userSchema;