const User = require('../models').User
const Article = require('../models').Article

module.exports = {
	list: (req, res, next) => {
		Article.findAll({
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
