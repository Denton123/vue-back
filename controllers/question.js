const User = require('../models').User
const Question = require('../models').Question

module.exports = {
	list: (req, res, next) => {
		Question.findAll({
			// where: {
			// 	user_id: req.params.id
			// },
			// include: [{
			// 	model: User,
			// 	attributes: ['name', 'avatar']
			// }]
		})
		.then(data => {
			res.send(data)
		})
	}
}
