/**
 *员工的具体的信息的模型定义
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeDetailScheam = new Schema({
    id: Number,
    identity: String,
    address: {type:String, default: ''},
    experience: [{time: String, company: String, item: String, job: String}],
    demerits: [{time: String, reason: String, way: String}],
    deal: [{type:String, default: null}],
    fresh: { type: Number, default: 1.0 },
});
export = employeeDetailScheam;