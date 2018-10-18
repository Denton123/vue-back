const Idea = require('../models').Idea
const path = require('path')
const formidable = require('formidable')
const User = require('../models').User

const imgUploadPath =require('../config/config.js')['imgUploads']

const fs = require('fs')
const gm = require('gm')

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
			user_id: req.body.user_id,
			title: req.body.title
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
		let page = parseInt(req.query.page) || 1
		let pageSize = parseInt(req.query.pageSize) || 6
		Idea.findAndCountAll({
			order: [['createdAt', 'DESC']],
			limit: pageSize
		}).then(data=>{
			res.send({
				data: data.rows,
				total: data.count,
				totalPage: Math.ceil(data.count/pageSize),
				pageSize: pageSize
			})
		})
	},
	showByUser: (req, res, next) => {
		let page = parseInt(req.query.page) || 1
		let pageSize = parseInt(req.query.pageSize) || 5
		Idea.findAndCountAll({
			where: {
				user_id: req.params.id
			},
			include: [{
				model: User,
				attributes: ['name', 'avatar']
			}],
			offset: (page -1) * pageSize,
			limit: pageSize
		})
		.then(data => {
			res.send({
				data: data.rows,
				total: data.count,
				currentPage: page,
				totalPage: Math.ceil(data.count/pageSize),
				pageSize: pageSize
			})
		})
		.catch(err => {
			res.send(err)
		})
	}
}