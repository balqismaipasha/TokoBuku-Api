const buku = require('../model/Buku.js')
const response = require('../config/response.js');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataBuku = (data, gambar) =>
    new Promise(async (resolve, reject) => {

        const bukuBaru = new buku({
            kodeBuku: data.kodeBuku,
            judulBuku: data.judulBuku,
            penerbit: data.penerbit,
            pengarang: data.pengarang,
            tahunTerbit: data.tahunTerbit,
            hargaBuku: data.hargaBuku,
            gambar: gambar
        })

        // console.log(bukuBaru)
        await buku.findOne({kodeBuku: data.kodeBuku})
            .then(buku => {
                if (buku) {
                    reject(response.commonErrorMsg('Kode buku sudah digunakan'))
                } else {
                    console.log('Kode buku belum ada')

                    bukuBaru.save()
                        .then(err =>{
                            // console.log("Berhasil Input Data")
                            resolve(response.commonSuccessMsg('Berhasil Input Data Buku'))
                        }).catch(err => {
                            // console.log('Gagal Input Data')
                        reject(response.commonErrorMsg('Gagal Input Data Buku'))
                    })
                }
            }).catch(err => {
            reject(response.commonErrorMsg('Maaf terjadi kesalahan pada server'))
        })
    })

exports.lihatDataBuku = () =>
    new Promise(async (resolve, reject) => {
       await buku.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=> reject(response.commonErrorMsg('Maaf terjadi kesalahan pada server')))
    })

exports.lihatDetailDataBuku = (kodeBuku) =>
    new Promise(async (resolve, reject) => {
        await buku.findOne({kodeBuku: kodeBuku})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=> reject(response.commonErrorMsg('Maaf terjadi kesalahan pada server')))
    })

exports.updateBuku = (id, data, gambar) =>
    new Promise(async (resolve, reject) => {
        await buku.updateOne(
            {_id: ObjectId(id)},
            {
                    $set: {
                        kodeBuku: data.kodeBuku,
                        judulBuku: data.judulBuku,
                        penerbit: data.penerbit,
                        pengarang: data.pengarang,
                        tahunTerbit: data.tahunTerbit,
                        hargaBuku: data.hargaBuku,
                        gambar: gambar
                    }
            }
        ).then(buku => {
            resolve(response.commonSuccessMsg('Berhasil Update Data Buku'))
        }).catch(err => {
            reject(response.commonErrorMsg('Gagal Update Buku'))
        })
    })

exports.hapusBuku = (_id) =>
    new Promise(async (resolve, reject) => {
        await buku.remove({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.commonSuccessMsg('Berhasil Hapus Data'))
            }).catch(()=> {
                reject(response.commonErrorMsg('Gagal Hapus Data'))
            })
    })
