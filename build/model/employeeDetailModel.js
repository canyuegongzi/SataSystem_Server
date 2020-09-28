"use strict";
/**
 *员工的具体的信息的模型定义
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeDetailScheam = new Schema({
    id: Number,
    identity: String,
    address: { type: String, default: '' },
    experience: [{ time: String, company: String, item: String, job: String }],
    demerits: [{ time: String, reason: String, way: String }],
    deal: [{ type: String, default: null }],
    fresh: { type: Number, default: 1.0 },
});
module.exports = employeeDetailScheam;
