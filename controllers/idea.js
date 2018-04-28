const Idea = require('../models').Idea
const path = require('path')
const formidable = require('formidable')

const imgUploadPath =require('../config/config.js')['imgUploads']

const fs = require('fs')
const gm = require('gm')

function getPath (req) {
	return new Promise((resolve, reject) => {
		const form = formidable.IncomingForm();
		form.uploadDir = './public/uploadImgs';
		form.parse(req, (err, fields, files) => {
			const imgName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + 1;
			const fullName = imgName + path.extname(files.file.name);
			const repath = './public/uploadImgs/' + fullName;
			fs.rename(files.file.path, repath);
			gm(repath)
			.resize(200, 200, "!")
			.write(repath, (err) => {
				// if(err){
				// 	console.log('裁切图片失败');
				// 	reject('裁切图片失败');
				// 	return
				// }
				resolve(fullName)
			})
		});
	})
}

module.exports = {
	// 上传图片
	uploadImg: (req, res, next) => {
		// 创建一个form表单
		const form = formidable.IncomingForm();
		// 上传文件临时文件存放地址
		form.uploadDir = './public/uploadImgs';
		form.parse(req, (err, fields, files) => {
			const imgName = 'upload_' + (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16);
			// path.extname：返回path路径文件扩展名(eg:jpg)
			const fullName = imgName + path.extname(files.file.name);
			const repath = './public/uploadImgs/' + fullName;
			// fs.rename：重写路径
			fs.rename(files.file.path, repath);
			// gm创建图片
			gm(repath)
			.resize(200, 200, "!")
			.write(repath, (err) => {
				res.send({
					status: 1,
					image_path: fullName
				})
		})
	})
	},
	store: (req, res, next) => {
		Idea.create({
			pic: req.body.pic,
			user_id: req.params.id,
			word: req.body.word
		})
		.then(data => {
			if (data) {
				res.send('success')
			} else {
				res.send('error')
			}
		})
		.catch(err => {
			res.send(err)
		})
	},
	index: (req, res, next) => {
		Idea.findAll().then(data=>{
			res.send(data)
		})
	}
}