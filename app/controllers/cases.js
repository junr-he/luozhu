var config = require("../../config");
var Cases = require("../models/cases");
var cate = require("../controllers/category");
var nav = require("../controllers/navigator");
var Page = require("../models/page");
var link = require("../controllers/friendlylinks");
var Category = require("../models/category");
var Navigator = require("../models/navigator");
var async = require('async');
//案例列表
exports.list = function (req, res) {
	var pageSize = 5; //每页显示条数
	var page = req.params.num - 1 || 0;
	Cases.find().count().exec(function (err, sum) {
		Cases.find().limit(pageSize).skip(pageSize * page).sort({_id: -1}).exec(function (err, _article) {
			Category.find({}, function (err, _category) {
				res.render('admin/articleList', {
					title: '文章列表',
					category: _category,
					article: _article,
					pagesize: sum
				})
			})
		});
	});
}

//案例文章
exports.add = function (req, res) {
	Category.find({}, function (err, _category) {
		res.render('admin/articleAdd', {
			title: '添加文章',
			category: _category
		})
	});
}

exports.update = function (req, res) {
	var _article = req.params;
	Category.find({}, function (err, _category) {
		Cases.findOne({
			"_id": _article.id
		}, function (err, _article) {
			res.render('admin/articleUpdata', {
				title: '编辑文章',
				category: _category,
				article: _article
			})
		});
	});
}

//案例提交与更新
exports.save = function (req, res) {
	var _articleC = req.body;
	var _article = {
		title: _articleC.title,
		alias: _articleC.alias,
		remark: _articleC.remark,
		categoryId: _articleC.categoryId,
		'markdownContent': _articleC['editormd-markdown-doc'],
	}

	if (_articleC._id) {
		var id = _articleC._id;
		Cases.update({
			_id: id
		}, _article, function (err, category) {
			res.redirect("/admin/articleList");
		});
	} else {
		Cases.create(_article, function (err, category) {
			res.redirect("/admin/articleList");
		});
	}

}

//获取指定列表文章
var getCategoryIdList = function (aliasId, callback) {
	Cases.find({
		"categoryId": aliasId
	}).sort({
		'_id': -1
	}).exec(function (err, _articleList) {
		return callback(_articleList)
	});
}

//获取指定分类文章
var getAliasCases = function (alias, callback) {
	Cases.findOne({
		"alias": alias
	}).exec(function (err, _article) {
		return callback(_article)
	});
}

//获取指定文章
var getAliasPage = function (url, callback) {
	Page.findOne({
		"url": url
	}).exec(function (err, _article) {
		return callback(_article)
	});
}

//获取所有文章
var getCategoryAllList = function (callback) {
	Cases.find().sort({
		'_id': -1
	}).exec(function (err, _articleList) {
		return callback(_articleList)
	});
}

//前台详情列表
exports.getList = function (req, res) {
	async.parallel([
		function (cb) {
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		function (cb) {
			cate.getCategoryAll(function (err, categories) {
				if (err) {
					cb(err);
				} else {
					cb(null, categories);
				}
			});
		},
		function (cb) {
			link.getLinkAll(function (err, friendLink) {
				if (err) {
					cb(err);
				} else {
					cb(null, friendLink);
				}
			})
		}], function (err, results) {
			var navigator = results[0],
				categories = results[1],
				link = results[2];
			getCategoryAllList(function (articleList) {
				var _article = articleList;
				for (var i = 0; i < categories.length; i++) {
					var cat = categories[i];
					for (var a = 0; a < _article.length; a++) {
						var art = _article[a];
						if (cat['_id'] == art['categoryId']) {
							art["AliasName"] = categories[i]["Alias"];
						}
					}
				}
				res.render('article', {
					title: "全部文章-" + config.name,
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					articleList: _article,
					navigator: navigator,
					friendlylinks: link
				})
			})
		})
}

exports.getCategoryList = function (req, res, next) {
	var _Alias = req.params.Alias;
	async.parallel([
		function (cb) {
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		function (cb) {
			cate.getCategoryAll(function (err, categories) {
				if (err) {
					cb(err);
				} else {
					cb(null, categories);
				}
			});
		},
		function (cb) {
			cate.getCategoryOne(_Alias, function (err, cateOne) {
				if (err) {
					cb(err);
				} else {
					cb(null, cateOne);
				}
			});
		},
		function (cb) {
			link.getLinkAll(function (err, friendLink) {
				if (err) {
					cb(err);
				} else {
					cb(null, friendLink);
				}
			})
		}], function (err, results) {
			var navigator = results[0],
				categories = results[1],
				cateOnes = results[2],
				link = results[3];
			for (var key in categories) {
				getCategoryIdList(categories[key]['_id'], function (articleList) {
					categories[key].sum = articleList.length;
				})
			}
			getCategoryIdList(cateOnes.catId, function (articleList) {
				res.render('admin/article-list', {
					title: cateOnes['name'] + "-" + config.name,
					cateOnes: cateOnes['name'],
					Alias: cateOnes['alias'],
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					articleList: articleList,
					navigator: navigator,
					friendlylinks: link
				});
			})
		})
}

//前台内容详情
exports.getShow = function (req, res) {
	var _Alias = req.params.alias;
		async.parallel([
			function (cb) {
				nav.getAllnav(function (err, navigator) {
					if (err) {
						cb(err);
					} else {
						cb(null, navigator);
					}
				})
			},
			function (cb) {
				cate.getCategoryAll(function (err, categories) {
					if (err) {
						cb(err);
					} else {
						cb(null, categories);
					}
				});
			},
			function (cb) {
				link.getLinkAll(function (err, friendLink) {
					if (err) {
						cb(err);
					} else {
						cb(null, friendLink);
					}
				})
			}],
		function (err, results) {
			var CateName,
				navigator = results[0],
				categories = results[1],
				link = results[2];
			getAliasCases(_Alias, function (_articleShow) {
				var CateName;
				if (_articleShow) {
					for (var i = 0; i < categories.length; i++) {
						if (categories[i]['_id'] == _articleShow.categoryId) {
							CateName = categories[i]['CateName']
							break;
						}
					}
					res.render('admin/article-detail', {
						title: _articleShow.title + "-" + config.name,
						keywords: config.keywords,
						hostUrl: config.host,
						description: config.description,
						categoryName: CateName,
						dirPath: config.dirname,
						articleShow: _articleShow,
						categorys: categories,
						navigator: navigator,
						friendlylinks: link
					});
				} else {
					res.redirect("/error");
				}
			})
		})
}

//单页详情
exports.getPage = function (req, res) {
	var _url = req.params.url;
	async.parallel([
		function (cb) {
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		function (cb) {
			cate.getCategoryAll(function (err, categories) {
				if (err) {
					cb(err);
				} else {
					cb(null, categories);
				}
			});
		},
		function (cb) {
			link.getLinkAll(function (err, friendLink) {
				if (err) {
					cb(err);
				} else {
					cb(null, friendLink);
				}
			})
		}], function (err, results) {
			var navigator = results[0],
				categories = results[1],
				link = results[2];
			getAliasPage(_url, function (_page) {
				res.render('page', {
					title: _page.name + "-" + config.name,
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					page: _page,
					navigator: navigator,
					friendlylinks: link
				});
			});
		})
}

//提交与更新
exports.delete = function (req, res) {
	var id = req.params.id;
	Cases.remove({
		_id: id
	}, function (err, article) {
		res.redirect("/admin/articleList");
	})
}