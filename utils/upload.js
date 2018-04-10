const fs = require('fs')
const formidable = require('formidable')

// 判断文件夹是否存在
function fsExistsSync(path) {
	try {
		fs.accessSync(path)
	}
	catch(e){
		return false
	}
	return true
}

// 初始化上传返回
function initUploader(path, ext = true, size = 2) {
	const form = new formidable.IncomingForm()
	if (!fsExistsSync(path)) fs.mkdirSync(path);
	form.encoding = 'utf-8'
	form.uploadDir = path // 上传文件的保存路径
	form.keepExtensions = ext // 保存扩展名
	form.maxFieldsSize = size * 1024 * 1024 //上传文件的最大大小
	return form 
}

module.exports = initUploader