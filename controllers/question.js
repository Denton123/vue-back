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
		Question.findAll({
			where: {
				user_id: req.params.id
			},
			include: [{
				model: User,
				attributes: ['name', 'avatar']
			}]
		})
		.then(data => {
			res.send(data)
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
	}
}
