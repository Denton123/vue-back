const User = require('../models').User
const crypto = require('crypto')
const path = require('path')

const imgUploadPath =require('../config/config.js')['imgUploads']

function getHash(password) {
	let hash = crypto.createHash('md5')
		.update(password)
		.digest('hex')
	return hash
}

module.exports = {
	findUser: (req, res, next) => {
		User.findById(req.params.id)
		.then(data => {
			res.send(data)
		})
	},
	// 所有用户
	list: (req, res, next) => {
		User.findAll({
			order: [['id', 'DESC']]
		}).then(resolve => {
			res.send(resolve)
		}).catch(err => {
			res.send(err)
		})
	},
	// 注册
	register: (req, res, next) => {
		User.find({
			where: {
				name: req.body.username
			}
		})
		.then(user => {
			if (!user) {
				let secret = getHash(req.body.password)
				User.create({
					name: req.body.username,
					password: secret
				})
				.then(user=> {
					res.send('200')
				}).catch(err=>{
					res.send(err)
				})
			} else {
				res.send('用户名已存在')
			}
		})
	},
	// 登录
	login: (req, res, next) => {
		let name = req.body.username
		let password = req.body.password
		let secret = getHash(password)
		User.find({
			where: {
				name: name,
				password: secret
			},
			attributes: {
				exclude: ['password']
			}
		})
		.then(user => {
			if (!user) {
				res.send('error')
			} else {
				req.session.user = user
				res.send(user)
			}
		})
	},
	// 退出 
	logout: (req, res, next) => {
		res.send(200)
	},
	// 编辑
	update: (req, res, next) => {
		// console.log(req.path);
		let contentType = req.get('Content-Type')
		// 更新头像
		if (contentType.indexOf('multipart/form-data') > -1) {
			const uploader = require('../utils/upload.js')(imgUploadPath)
			uploader.parse(req, (err, fields, files) => {
				if (err) {
					throw err
				}
				let data = {}
				for (let i in fields) {
					if (fields[i].length > 0) {
						data[i] = fields[i]
					}
				}
				if(files['file'] && files['file'].size > 0) {
					data['img'] = path.basename(files.file.path);
					if (req.path.indexOf('avatar') !== -1) {
						User.update({
							avatar: data['img']
						},{
							where: {
								id: req.params.id
							}
						}).then(result => {
							if (result[0] === 1) {
								User.findById(req.params.id)
								.then(data => {
									res.send(data)
								})
							}
						})
					} else {
						User.update({
							bg: data['img']
						},{
							where: {
								id: req.params.id
							}
						}).then(result => {
							if (result[0] === 1) {
								User.findById(req.params.id)
								.then(data => {
									res.send(data)
								})
							}
						})
					}
				}
			})
		} else {
			User.update({
				name: req.body.name,
				sex: req.body.sex,
				desc: req.body.desc
			},{
				where: {
					id: req.params.id
				}
			})
			.then(data => {
				res.send(data)
			})
		}
	}
}