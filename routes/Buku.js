const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const bukuController = require('../controller/Buku.js');

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        // mengatur nama foto
        cb(null, Date.now()+ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar");

router.post("/input", upload, (req, res) => {
    // console.log(req.file)
    bukuController.inputDataBuku(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/databuku", (req, res) => {
    bukuController.lihatDataBuku()
        .then((result)=> res.json(result))
        .catch((err) => res.json(err))
})

router.get("/databuku/:id", (req, res) => {
    bukuController.lihatDetailDataBuku(req.params.id)
        .then((result)=> res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
    bukuController.hapusBuku(req.params.id)
        .then((result)=> res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
    let fileName;
    if (req.body.gambar) {
        fileName = req.body.gambar;
    } else {
        fileName = req.file.filename;
    }

    bukuController.updateBuku(req.params.id, req.body, fileName)
        .then((result)=> res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
