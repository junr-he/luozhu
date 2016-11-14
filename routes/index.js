//后台路由
var Admin = require('../app/controllers/admin')
var Index = require('../app/controllers/index')
var Cases = require('../app/controllers/cases')
var Article = require('../app/controllers/article')
var category = require('../app/controllers/category')
var Navigator = require('../app/controllers/navigator')
var friendlylink = require('../app/controllers/friendlylinks')
var Page = require('../app/controllers/page')//前台路由

module.exports = function (app) {

	/*//pre handle user
	app.use(function(req, res, next) {
	    var _user = req.session.admin
	    console.log(_user)
	    //app.locals.user = _user
	    next()
	})*/

	// 首页
	app.get(['/','/index','/home'], Index.index);
	// 团队
	app.get('/teams', Index.teams);
	// 关于我们
	app.get('/aboutus', Index.aboutus);
	// 服务案例
	app.get('/cases', Index.cases);
	app.post('/getCasesShow', Index.getCasesShow);
	// 企业新闻
	app.get('/news', Index.news);
	// 联系我们
	app.get('/contactus', Index.contactus);
	// User
	app.post('/user/signin', Admin.login);
	app.get('/admin/login', Admin.showSignin);
	app.get('/admin/quit', Admin.quit);

	/******后台*****/
	app.get('/admin/main', Admin.isLogin, Admin.main);
	//导航管理
	app.get('/admin/navigatorList', Admin.isLogin, Navigator.list);
	app.get('/admin/navigatorAdd', Admin.isLogin, Navigator.add);
	app.post('/admin/navigatorAdd/save', Admin.isLogin, Navigator.save);
	app.get("/admin/navigate/update/:id", Admin.isLogin, Navigator.update);
	app.get("/admin/navigate/delete/:id", Admin.isLogin, Navigator.delete);
	//其他管理
	app.get(['/admin/pageList', '/admin/pageList/page/:num'], Admin.isLogin, Page.list);
	app.get('/admin/pageList/add', Admin.isLogin, Page.add);
	app.post('/admin/pageList/save', Admin.isLogin, Page.save);
	app.get('/admin/pageList/edit/:id', Admin.isLogin, Page.update);
	app.get('/admin/pageList/delete/:id', Admin.isLogin, Page.delete);
	//新闻管理
	app.get('/admin/articleList', Admin.isLogin, Article.list);
	app.get('/admin/articleAdd', Admin.isLogin, Article.add);
	app.post('/admin/article/save', Admin.isLogin, Article.save);
	app.get('/admin/articleEdit/:id', Admin.isLogin, Article.update);
	app.get('/admin/article/delete/:id', Admin.isLogin, Article.delete);
	//案例管理
	app.get('/admin/casesList', Admin.isLogin, Cases.list);
	
	//分类管理
	app.get(['/admin/categoryList', '/admin/categoryList/page/:num'], Admin.isLogin, category.list);
	app.get('/admin/categoryList/delete', Admin.isLogin, category.delete);
	app.post('/admin/categoryList/save', Admin.isLogin, category.save);
	//友情连接
	app.get(['/admin/friendlylinkList', '/admin/friendlylinkList/page/:num'], Admin.isLogin, friendlylink.list);
	app.post('/admin/friendlylinkList/save', Admin.isLogin, friendlylink.save);
	app.get('/admin/friendlylinkList/delete', Admin.isLogin, friendlylink.delete);

	//新闻列表页
	app.get(['/blog'], Article.getList);
	app.get(['/:Alias'], Article.getCategoryList);
	//单页
	app.get('/page/:url', Article.getPage);
	//文章详情页
	app.get('/:Alias/:alias', Article.getShow);
}