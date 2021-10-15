var express = require('express');
var router = express.Router();
var mysql = require("../cone").pool;
var login = require("../middleware/login");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


router.post('/cadastro', (req, res, next) => {
    var sql = "INSERT INTO user( nome,estado_btn) VALUES ( ?, ? )";
    console.log(sql)
    var params = [req.body.nome, req.body.estado_btn];

    mysql.getConnection((error, conn) => {
        conn.query(sql, params,
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        menssagem: error.sqlMessage,

                        reponse: null

                    });

                }
                res.status(201).send({
                    menssagem: "Cadastro !",
                    ID_inserido: results.insertId



                })
            })

    })
});
router.post('/cad/:nome', (req, res, next) => {

    var sql = "UPDATE user SET estado_btn=? WHERE nome = '" + req.params.nome + "';";
    var params = [req.body.btn_estado];




    mysql.getConnection((error, conn) => {
        conn.query(sql, params,
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null

                    });

                }
                res.status(201).send({
                    menssagem: "BTN ESTADO",


                })
            })

    })
})
router.post('/menssagem/:nome', (req, res, next) => {

    var sql = "INSERT INTO user (nome,codigo, menssagem) VALUES (?,?,?);";
    var params = [req.params.nome,req.body.codigo,req.body.menssagem];



    mysql.getConnection((error, conn) => {
        conn.query(sql, params,
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null

                    });

                }
                res.status(201).send({
                    menssagem: "Sucesso",


                })
            })

    })
})
router.get('/select/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query("select * from user  ", 
            (error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send(results)
            })

    })

})
router.get('/estado', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query("select * from user ",
            (error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send(results)
            })

    })

})

router.post('/motivo/:id', (req, res, next) => {

    var sql = "UPDATE user SET motivo=? WHERE nome = '" + req.params.nome + "';";
    var params = [req.body.motivo];




    mysql.getConnection((error, conn) => {
        conn.query(sql, params,
            (error, results, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null

                    });

                }
                res.status(201).send({
                    menssagem: "BTN ESTADO",


                })
            })

    })
})
module.exports = router;