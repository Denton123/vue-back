function IQuery(Model) {
	return new IQuery.fn.init(Model)
}

IQuery.fn = IQuery.prototype = {
	
	init: function (Model) {
		this.Model = Model
		return this
	},

	pagination: function (request, query = {}) {
		let page = parseInt(request.query.page) || 1 // 页数
		let pageSize = parseInt(request.query.pageSize) || 10 // 每页多少条数据
		let q = Object.assign({}, {
			offset: (page - 1) * pageSize,
			limit: pageSize
		}, query)
		// console.log('pagination --------- ', q)
		return new Promise((resolve, reject) => {
			this.Model.findAndCountAll(q)
			.then(model => {
				let res = {
					currentPage: page,
					totalPage: Math.ceil(model.count/pageSize),
					pageSize: pageSize,
					total: model.count,
					data: model.rows
				}
				resolve(res)
			})
			.catch(err => {
				reject(err);
			})
		})
	}

}

IQuery.fn.init.prototype = IQuery.prototype

module.exports = IQuery
