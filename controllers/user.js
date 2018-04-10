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

console.log(User + 'new');
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
			attributes: {exclude: ['password']}
		})
		.then(user => {
			if (!user) {
				res.send('error')
			} else {
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
		let contentType = req.get('Content-Type')
		if (contentType.indexOf('multipart/form-data') > -1) {
			const uploader = require('../utils/upload.js')(imgUploadPath)
			uploader.parse(req, (err, fields, files) => {
				if (err) {
					throw err
				}
				let data = {}
				for (let i in fields) {
					//如果数据存在就添加
					if (fields[i].length > 0) {
						data[i] = fields[i]
					}
				}
				if(files['file'] && files['file'].size > 0) {
					data['avatar'] = path.basename(files.file.path);
					User.update({
						avatar: data['avatar']
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
				
			})
			
		}
	}
}