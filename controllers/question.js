const Sequelize = require('sequelize')
const Op = Sequelize.Op

const User = require('../models').User
const Question = require('../models').Question

const func = require('../utils/util')

let query = {
	include: [{
		model: User,
		attributes: ['name', 'avatar']
	}]
}
let uquery = {
	include: [{
		model: User,
		attributes: ['name', 'avatar']
	}]
}

function transform(data) {
	let params = {}
	for(let i in data) {
		if (i === 'content') {
			params[i] = func.htmlspecialchars(data[i])
		} else {
			params[i] = data[i]
		}
	}
	return params
}

module.exports = {
	// 全部问题列表
	list: (req, res, next) => {
		Question.findAll(query)
		.then(data => {
			res.send(data)
		})
	},
	// 根据用户id显示问题
	showByUser: (req, res, next) => {
		let page = parseInt(req.query.page) || 1
		let pageSize = parseInt(req.query.pageSize) || 5
		Question.findAndCountAll({
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
	},
	// 根据问题id显示问题
	showById: (req, res, next) => {
		Question.findById(req.params.id, query)
		.then(data => {
			data['content'] = func.htmlspecialchars_decode(data['content'])
			res.send(data)
		})
	},
	// 根据问题id更新问题
	updateById: (req, res, next) => {
		// let data = transform(req.body)
		Question.update({
			title: req.body.title,
			content: req.body.content,
		},{
			where: {
				id: req.params.id
			}
		})
		.then(data => {
			if (data[0] === 1) {
				Question.findById(req.params.id)
				.then(data=>{
					data['content'] = func.htmlspecialchars_decode(data['content'])
					res.json(data)
				})
			}
		})
		.catch(err => {
			res.send(err)
		})
	},
	// 新增问题
	store: (req, res, next) => {
		Question.find({
			where: {
				title: req.body.title
			}
		})
		.then(data => {
			if (!data) {
				Question.create({
					title: req.body.title,
					content: req.body.content,
					solve: '0',
					user_id: req.body.user_id
				})
				.then(result => {
					if (result) {
						res.send('success')
					} else {
						res.send('error')
					}
				})
				.catch(err => {
					res.send(err)
				})
			}
		})
	}
}
