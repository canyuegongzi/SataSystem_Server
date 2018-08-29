/**
 *author: Marvin
 *@employeeController：员工模块路由
 *@'/': 测试路由
 *@'/api/admindetail': 员工详情
 *@'/api/admindelete': 员工删除
 *@'/api/admininfosum': 员工查询
 *@/api/addadmin: 添加员工
 *@/api/adminedit: 编辑员工
 *@/api/adminroot: 注册员工
 */
import {makeDiffId} from './commonFunction';
import employeeSchema = require("../model/employeeModel");
import employeeDetailScheam = require('../model/employeeDetailModel');
/*公共框架*/
const mongoose = require('mongoose');
let reach = ['策划', '行政', '公关', '研发一', '研发二', '研发三', '研发四', '设计一', '设计二', '市场一', '市场二', '销售一',
    '销售二', '网络', '秘书处'];
let age = ['20-25', '26-30', '30-35', '35-40', '40-45', '45-50']

export function employeeController(app) {
    /*员工基本信息的约束*/
    const emPerson = employeeSchema;
    /*员工详细信息的约束*/
    const PersonDetailScheam = employeeDetailScheam;
    /*员工基本信息的模型*/
    const EmployeeModel = mongoose.model('st_employees', emPerson);
    /*员工详细信息的模型*/
    const DetailModel = mongoose.model('st_employeedetails', PersonDetailScheam);
    app.get('/api/admininfosum', (req, res) => {
        /*参数以备后用*/
        const params = req.query;
        /*参中的页码*/
        const page = Number(params.page);
        /*总数*/
        let total;

        if ((Number(page))) {
            EmployeeModel.find({'delflag': 1.0}, (err, docs) => {
                if (!err) {
                    EmployeeModel.count({'delflag': 1.0}, (err, count) => {
                        if (!err) {
                            res.json({data: docs, total: count, reach: reach, ages: age, status: true});
                        } else {
                            res.json({data: null, total: count, reach: null, ages: null, status: false});
                        }
                    });
                }
            }).skip(page - 1).limit(10)
        } else if (params.code) {
            EmployeeModel.find({'delflag': 1.0, 'code': params.code}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false});
                }
            })
        } else if (params.name) {
            EmployeeModel.find({'delflag': 1.0, 'name': params.name}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false});
                }
            })
        } else if (params.reach != '-1') {
            EmployeeModel.find({'delflag': 1.0, 'reach': params.reach}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false, message: 'error'});
                }
            })
        } else if (params.name && params.reach == '-1') {
            EmployeeModel.find({'delflag': 1.0, 'name': params.name}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false});
                }
            })
        } else if (params.name && params.reach != '-1') {
            console.log('sss')
            EmployeeModel.find({'delflag': 1.0, 'reach': params.reach, 'name': params.name}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false, message: 'error'});
                }

            })
        } else if (params.age && params.reach == '-1') {
            let first = req.query.age.substr(0, 2);
            let last = req.query.age.substr(3, 2);
            EmployeeModel.find({'delflag': 1.0, age: {$lt: last, $gt: first}}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false, message: 'error'});
                }
            })
        } else if (params.age && params.reach != '-1') {
            let first = req.query.age.substr(0, 2);
            let last = req.query.age.substr(3, 2);
            EmployeeModel.find({'delflag': 1.0, age: {$lt: last, $gt: first}, 'reach': params.reach}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false, message: 'error'});
                }
            })
        } else if (params.data && params.reach == '-1') {
            console.log(params.data);
            let datafirst = req.query.data.substr(0, 4);
            let datalast = req.query.data.substr(7, 2);
            EmployeeModel.find({'delflag': 1.0, 'date': params.data}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        data: docs,
                        status: true,
                        total: docs.length, reach: reach, ages: age,
                    });
                } else {
                    res.json({status: false, message: 'error'});
                }
            })
        } else if (params.data && params.reach != '-1') {
            EmployeeModel.find({'delflag': 1.0, 'date': params.data, 'reach': params.reach,}, (err, docs) => {
                if (!err) {
                    docs.length == 0 ? res.json({status: false, message: 'noperson'}) : res.json({
                        docs,
                        status: true,
                        total: docs.length
                    });
                } else {
                    res.json({status: false, message: 'error'});
                }
            })
        } else {
            EmployeeModel.find({'delflag': 1.0}, (err, docs) => {
                if (!err) {
                    EmployeeModel.count({'delflag': 1.0}, (err, count) => {
                        if (!err) {
                            res.json({data: docs, total: count, reach: reach, ages: age, status: true});
                        } else {
                            res.json({data: null, total: count, reach: null, ages: null, status: false});
                        }
                    });
                }
            }).skip(page - 1).limit(10)
        }
        console.log(req.query);
    });
    app.get('/api/admindelete', (req, res) => {
        let id = req.query.id;
        //console.log(id)
        EmployeeModel.update({'id': id}, {$set: {'delflag': 2.0}}, (err) => {
            if (!err) {
                res.json({status: true, time: new Date().toDateString()})
            } else {
                res.json({status: false, time: new Date().toDateString()})
            }
        })
    });
    app.get('/api/admindetail', (req, res) => {
        let id = req.query.id;
        if (id) {
            EmployeeModel.findOne({'delflag': 1, 'id': id}, (errone, docsone) => {
                if (!errone) {
                    DetailModel.findOne({'id': id}, (errtwo, docstwo) => {
                        if (!errtwo) {
                            //console.log([docsone, docstwo])
                            res.json([docsone, docstwo])
                        }
                    })
                }
            })
        }
    });
    app.post('/api/addadmin', (req, res) => {
        const params = JSON.parse(JSON.stringify(req.body)).params;
        /*let params = {
            reach: 'mike',
            phone: '18660683370',
            star: 0,
            demerits: 0,
            id: 1533283697802,
            name: '升水',
            age: 0,
            sex: 1,
            Id_no: '622426199705122010',
            date: '2018-08-07',
            code: 'RcB9',
            deal: []
        }*/
        let hasem = false;
        let employeeId = makeDiffId();
        EmployeeModel.find({'phone': params.phone, 'delflag': 1.0}, (err, docs) => {
            if (!err) {
                if (docs.length == 0) {
                    EmployeeModel.create({
                        reach: params.reach,
                        phone: params.phone,
                        star: params.star,
                        demerit: params.demerits,
                        id: employeeId,
                        name: params.name,
                        age: params.age,
                        sex: params.sex,
                        Id_no: params.Id_no,
                        date: params.date,
                        code: params.code,
                    }, (err, docs) => {
                        if (!err) {
                            DetailModel.create({
                                id: employeeId,
                                identity: params.Id_no,
                                deal: params.deal,
                                experience: [{
                                    time: "暂无数据",
                                    company: "暂无数据",
                                    item: "暂无数据",
                                    job: "暂无数据"
                                }],
                                demerits: [
                                    {
                                        time: "暂无数据",
                                        reason: "暂无数据",
                                        way: "暂无数据"
                                    }
                                ]
                            }, (err, docs) => {
                                if (!err) {
                                    res.json({status: true, time: new Date().toDateString(), message: 'ok'})
                                } else {
                                    res.json({status: false, time: new Date().toDateString(), message: 'error'})
                                }
                            })
                        } else {
                            return res.json({status: false, time: new Date().toDateString(), message: 'error'})
                        }
                    })
                } else {
                    return res.json({status: false, date: new Date(), message: 'hasuser'});
                }
            }
        });
    });
    app.post('/api/adminedit', (req, res) => {
        const params = JSON.parse(JSON.stringify(req.body)).params;
        /*let params = {
            name: '雍飞',
            code: 'keill',
            sex: 0,
            reachs: {value: 1, label: '策划'},
            date: '2018-07-25',
            age: 29,
            deal: [],
            fresh: 1,
            identity: '420101198101016450',
            phone: '13013115551',
            root: 1,
            address: '暂时没有模拟的家庭住址的数据',
            demerits: 2,
            star: 2,
            id: '1533291538864'
        }*/
        EmployeeModel.update({'id': Number(params.id)}, {
            $set: {
                reach: params.reachs.label,
                phone: params.phone,
                star: params.stars,
                demerit: params.demerit,
                name: params.name,
                age: params.age,
                sex: params.sex,
                Id_no: params.identity,
                date: params.date,
                fresh: params.fresh,
                id: Number(params.id)
            }
        }, (err, docs) => {
            if (!err) {
                DetailModel.update({'id': Number(params.id)}, {
                    $set: {
                        fresh: params.fresh,
                        identity: params.identity,
                        deal: params.deal,
                        id: Number(params.id),
                        address: params.address
                    }
                }, (err, docs) => {
                    if (!err) {
                        res.json({status: true, time: new Date().toDateString(), message: 'ok'});
                    } else {
                        res.json({status: false, time: new Date().toDateString(), message: 'error'})
                    }
                })
            } else {
                return res.json({status: false, time: new Date().toDateString(), message: 'error'});
            }
        })

    });
    app.get('/api/adminroot', (req, res) => {
        //const params = JSON.parse(JSON.stringify(req.body)).params;
        const params = {
            id: 1533291538864
        }
        EmployeeModel.findOne({'id': Number(params.id)}, (err, docs) => {
            if (!err) {
                if (docs.root == 1) {
                    EmployeeModel.updateOne({'id': Number(params.id)}, {$set: {'root': 2.0}}, (err, docs) => {
                        if (!err) {
                            res.json({status: true, time: new Date().toDateString(), message: 'ok'});
                        } else {
                            res.json({status: false, time: new Date().toDateString(), message: 'error'});
                        }
                    })
                } else {
                    res.json({status: false, time: new Date().toDateString(), message: 'already'});
                }
            } else {
                res.json({status: false, time: new Date().toDateString(), message: 'error'});
            }
        })
    })
}