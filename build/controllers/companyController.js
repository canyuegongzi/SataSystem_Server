"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *author: Marvin
 *@companyController：管理员登录的处理路由
 *@'/api/company': 合作伙伴
 */
var company = require("../model/companyModel");
/*公共框架*/
var mongoose = require('mongoose');
function companyController(app) {
    var companyScheam = company;
    var compmpanyModel = mongoose.model('st_compannys', companyScheam);
    app.get('/api/company', function (req, res) {
        compmpanyModel.count({ 'delflag': 1 }, function (err, count) {
            if (!err) {
                if (req.query.page) {
                    compmpanyModel.find({ 'delflag': 1 }, function (err, docs) {
                        !err ? res.json({ data: docs, total: count, message: 'ok', statue: true }) : res.json({
                            data: docs,
                            total: count,
                            message: 'error',
                            statue: false
                        });
                    }).skip(req.query.page - 1).limit(10);
                }
                else if (req.query.name) {
                    compmpanyModel.find({ 'delflag': 1, 'name': req.query.name }, function (err, docs) {
                        !err ? res.json({ data: docs, total: count, message: 'ok', statue: true }) : res.json({
                            data: docs,
                            total: count,
                            message: 'error',
                            statue: false
                        });
                    });
                }
                else {
                    compmpanyModel.find({ 'delflag': 1 }, function (err, docs) {
                        !err ? res.json({ data: docs, total: count, message: 'ok', statue: true }) : res.json({
                            data: docs,
                            total: count,
                            message: 'error',
                            statue: false
                        });
                    }).skip(req.query.page - 1).limit(10);
                }
            }
        });
    });
}
exports.companyController = companyController;
