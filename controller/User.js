const userModel = require('../model/User.js');
const response = require('../config/response.js');
const bcrypt = require('bcrypt');

exports.registrasi = (data) =>
    new Promise((resolve, reject) => {
        // console.log(data)
        userModel.findOne({userName: data.userName})
            .then(user => {
                if (user) {
                    resolve(response.commonErrorMsg('Username Sudah digunakan'))
                } else {
                    bcrypt.hash(data.password, 10,(err, hash) => {
                        if (err){
                            reject(response.commonErrorMsg())
                        } else {
                            data.password = hash
                            userModel.create(data)
                                .then(()=> resolve(response.commonSuccessMsg('Berhasil Registrasi')))
                                .catch(()=>reject(response.commonErrorMsg('Gagal Registrasi')))
                        }
                    })
                }
            }).catch(() => reject(response.commonError))
    })

exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            userName: data.userName
        }).then(user => {
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    resolve(response.commonResult(user))
                } else {
                    reject(response.commonErrorMsg('Password Salah'))
                }
            } else {
                reject(response.commonErrorMsg('Username Tidak Ditemukan'))
            }
        })
    })