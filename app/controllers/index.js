var async = require('async');
var config = require("../../config");
var nav = require("../controllers/navigator");
var Navigator = require("../models/navigator");
var Banner = require("../models/banner");

// 首页
exports.index = function(req, res){
	async.parallel([
		// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// 轮播
		function(cb){
			Banner.find().sort({
				sort: 1
			}).exec(function (err, banner) {
				if (err) {
					return cb(err)
				} else {
					return cb(null, banner)
				}
			});
		},
		/*// 踏实的建筑公司
		function(cb){
			
		},
		// 丰富的项目经验
		function(cb){
			
		},
		// 行业快讯
		function(cb){
			
		},
		// 团队成员
		function(cb){
			
		}*/],
	function(err, results){
		var navigator = results[0], banner = results[1];
		var ideas=[{
				title:'严查施工保证质量',
				more:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
			},{
				title:'把控方案设计风格',
				more:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
			},{
				title:'严查施工保证质量',
				more:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
			}];
		var company={
			title:'踏实的建筑公司',
			sub:'Practical construction company',
			bigImgPath:'dist/img/05.png',
			intro:'本公司座落于深圳市流塘新村六巷十号，现扔有高级工程师1名，工程师4人，技术人员8名，项目经理5名，一流的施工生产设备，先进的施工工艺，科学的管理施工流程和完善的检测手段，可根据不同的业主，设计不同的施工方案，根据业主不同性格定位、设计出不同的、令业主满意的产品风格。<br>&emsp;&emsp;螺主劳务建筑装饰公司拥有几支优秀专业的施工队伍，在建筑装饰行业摸爬滚打了20几年，先后完成了，XXX等项目的装饰设计工程项目，同时本公司也在全国、上海、成都、广州、佛山、惠州、顺德等地建设了花都、广州南沙、碧桂园、成都万达广场项目的钢筋、模板、混泥土等主体工程，施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础。',
			imgs:['dist/img/06.png','dist/img/07.png','dist/img/08.png','dist/img/09.png']
		};
		var experience={
			title:'丰富的项目经验',
			sub:'Rich project experience',
			list:[{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/10.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/11.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/12.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/13.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/14.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/15.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/16.png'
			},{
				url:'/experience',
				title:'古典风格四室居设计',
				imgPath:'dist/img/17.png'
			}]
		};
		var news={
			title:'行业快讯',
			sub:'Industry News',
			newsList:[{
				url:'/news',
				imgPath:'dist/img/18.png',
				news_title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				news_txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				url:'/news',
				imgPath:'dist/img/19.png',
				news_title:'郑州高校新食堂“致青春”逆天',
				time:'2016-10-14 14:15:24',
				news_txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				url:'/news',
				imgPath:'dist/img/20.png',
				news_title:'装修风格文艺范',
				time:'2016-10-14 14:15:24',
				news_txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			}]
		};
		var teams={
			title:'行业快讯',
			sub:'Industry News',
			team_members:[{
				url:'/teams',
				imgPath:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				intro:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。工程师的称谓，通常只用于在工程学其中1个范畴持有专业性学位或相等工作经验的人士'
			},{
				url:'/teams',
				imgPath:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				intro:'前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师前端工程师'
			},{
				url:'/teams',
				imgPath:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				intro:'架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师架构师'
			}]
		};
		var contact={
			title:'联系我们',
			sub:'Contact us',
			phone:'0123-12345677',
			fax:'0123-12345677',
			address:'深圳市宝安区西乡流塘新村6巷10号'
		}
		res.render('index', {
			navigator: navigator,
			banner: banner,
			ideas: ideas,
			company: company,
			experience: experience,
			news: news,
			teams: teams,
			contact: contact
		})
	})
}

// 轮播管理
exports.indexBanner = function(callback){
	Banner.find().sort({
		sort: 1
	}).exec(function (err, banner) {
		if (err) {
			return callback(err)
		} else {
			return callback(null, banner)
		}
	});
}

// 公司介绍
exports.indexIntro = function(req,res){
	
}

// 项目经验
exports.indexExp = function(req,res){
	
}

// 行业快讯
exports.indexNews = function(req,res){
	
}

// 团队成员
exports.indexTeams = function(req,res){
	
}

// 联系我们
exports.indexContactus = function(req,res){
	
}


// 团队
exports.teams = function (req, res) {
	async.parallel([
		/*// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// commonTop
		function(cb){
			
		},
		// teamsTabs
		function(cb){
			
		}*/],
	function(err, results){
		//var navigator = results[0];
		var navigator=[{
			name:'团队成员',
			sort:'1',
			remark:'teams',
			url:'/teams'
		},{
			name:'关于我们',
			sort:'1',
			remark:'abouts',
			url:'/aboutus'
		},{
			name:'服务案例',
			sort:'1',
			remark:'cases',
			url:'/cases'
		},{
			name:'企业新闻',
			sort:'1',
			remark:'news',
			url:'/news'
		},{
			name:'联系我们',
			sort:'1',
			remark:'contactus',
			url:'/contactus'
		}];
		var contact={
			title:'联系我们',
			sub:'Contact us',
			phone:'0123-12345677',
			fax:'0123-12345677',
			address:'深圳市宝安区西乡流塘新村6巷10号'
		};
		var teamsTabs = [{
			tabHead:'总部人员',
			tabBody:[
				{avatar:'dist/img/21.png',
					name:'凯子',
					job:'总经理/CEO',
					about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。工程师的称谓，通常只用于在工程学其中一个范畴持有专业性'
				},{avatar:'dist/img/22.png',
					name:'凯子',
					job:'总经理/CEO',
					about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。'
				}
			]},{
			tabHead:'建筑师',
			tabBody:[
				{avatar:'dist/img/22.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。'
			},{avatar:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。工程师的称谓，通常只用于在工程学其中一个范畴持有专业性'
			}]
		},{
			tabHead:'室内设计师',
			tabBody:[
				{avatar:'dist/img/22.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师指具有从事工程系统操作、设计、管理、评估能力的人员。'
			},{avatar:'dist/img/21.png',
				name:'凯子',
				job:'总经理/CEO',
				about:'工程师的称谓，通常只用于在工程学其中1个范畴持有专业性'
			}]
		}];
		var works=[{
			id:12,
			imgPath:'dist/img/32.png'
		},{
			id:13,
			imgPath:'dist/img/30.png'
		},{
			id:14,
			imgPath:'dist/img/31.png'
		},{
			id:15,
			imgPath:'dist/img/30.png'
		},{
			id:16,
			imgPath:'dist/img/31.png'
		},{
			id:17,
			imgPath:'dist/img/32.png'
		}]
		res.render('teams', {
			navigator: navigator,
			teamsTabs:teamsTabs,
			contact: contact,
			works: works
		})
	})
}

// 关于我们
exports.aboutus = function (req, res) {
	async.parallel([
		/*// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// commonTop
		function(cb){
			
		},
		// teamsTabs
		function(cb){
			
		}*/], 
	function(err, results){
		//var navigator = results[0];
		var navigator=[{
			name:'团队成员',
			sort:'1',
			remark:'teams',
			url:'/teams'
		},{
			name:'关于我们',
			sort:'1',
			remark:'abouts',
			url:'/aboutus'
		},{
			name:'服务案例',
			sort:'1',
			remark:'cases',
			url:'/cases'
		},{
			name:'企业新闻',
			sort:'1',
			remark:'news',
			url:'/news'
		},{
			name:'联系我们',
			sort:'1',
			remark:'contactus',
			url:'/contactus'
		}];
		var contact={
			title:'联系我们',
			sub:'Contact us',
			phone:'0123-12345677',
			fax:'0123-12345677',
			address:'深圳市宝安区西乡流塘新村6巷10号'
		}
		var aboutCompany={
			imgPath:['dist/img/05.png','dist/img/06.png'],
			intro:['本公司座落于深圳市流塘新村六巷十号，现扔有高级工程师1名，工程师4人，技术人员8名，项目经理5名，一流的施工生产设备，先进的施工工艺，科学的管理施工流程和完善的检测手段，可根据不同的业主，设计不同的施工方案，根据业主不同性格定位、设计出不同的、令业主满意的产品风格。<br>&emsp;&emsp;螺主劳务建筑装饰公司拥有几支优秀专业的施工队伍，在建筑装饰行业摸爬滚打了20几年，先后完成了，XXX等项目的装饰设计工程项目，同时本公司也在全国、上海、成都、广州、佛山、惠州、顺德等地建设了花都、广州南沙、碧桂园、成都万达广场项目的钢筋、模板、混泥土等主体工程，施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础。','螺主劳务建筑装饰公司拥有几支优秀专业的施工队伍，在建筑装饰行业摸爬滚打了20几年，先后完成了，XXX等项目的装饰设计工程项目，同时本公司也在全国、上海、成都、广州、佛山、惠州、顺德等地建设了花都、广州南沙、碧桂园、成都万达广场项目的钢筋、模板、混泥土等主体工程，施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础。']
		}
		var watchword={
			imgPath:'dist/img/24.png',
			title:'“ 共享平台、共同创业、共谋发展、共离成果 ”',
			signs:'主打造开放、共赢的装修家居生态系统，推动行业更阳光、更透明。螺主用实际行动获得众多的关注，相继受到央视网、光明网、新华网、凤凰网、第一财经周刊、21世纪商业评论、IT经理世界、36氪 等多家媒体的关注与报道。'
		}
		var goals=[{
			title:'严查施工保证质量',
			details:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
		},{
			title:'把控方案设计风格',
			details:'施工技术和管理方面都积累了丰富的经验，在建筑装饰行业都树立了良好的形象，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
		},{
			title:'严查施工保证质量',
			details:'施工技术和管理方面都积累了丰富的经验，赢得了客户的广泛赞赏，并培养了一批技术人员和管理人才、为自发性组织发展成为业内劳务公司奠定了坚实的基础'
		}]
		res.render('aboutus', {
			navigator: navigator,
			aboutCompany:aboutCompany,
			watchword: watchword,
			contact: contact,
			goals: goals
		})
	})
}

// 服务案例
exports.cases = function (req, res) {
	async.parallel([
		/*// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// commonTop
		function(cb){
			
		},
		// teamsTabs
		function(cb){
			
		}*/],
	function(err, results){
		//var navigator = results[0];
		var navigator=[{
			name:'团队成员',
			sort:'1',
			remark:'teams',
			url:'/teams'
		},{
			name:'关于我们',
			sort:'1',
			remark:'abouts',
			url:'/aboutus'
		},{
			name:'服务案例',
			sort:'1',
			remark:'cases',
			url:'/cases'
		},{
			name:'企业新闻',
			sort:'1',
			remark:'news',
			url:'/news'
		},{
			name:'联系我们',
			sort:'1',
			remark:'contactus',
			url:'/contactus'
		}];
		var contact={
			title:'联系我们',
			sub:'Contact us',
			phone:'0123-12345677',
			fax:'0123-12345677',
			address:'深圳市宝安区西乡流塘新村6巷10号'
		}
		var cases = [{
			tabHead:'建筑项目',
			tabBody:[{
				id:0,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/10.png'
			},{
				id:1,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/11.png'
			},{
				id:2,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/12.png'
			},{
				id:3,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/13.png'
			},{
				id:4,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/14.png'
			},{
				id:5,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/15.png'
			},{
				id:6,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/16.png'
			},{
				id:7,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/17.png'
			}]
		},{
			tabHead:'室内设计',
			tabBody:[{
				id:7,
				title:'古典风格四室居设计',
				imgPath:'dist/img/17.png'
			},{
				id:6,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/16.png'
			},{
				id:5,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/15.png'
			},{
				id:4,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/14.png'
			},{
				id:3,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/13.png'
			},{
				id:2,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/12.png'
			},{
				id:1,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/11.png'
			},{
				id:1,
				title:'古典风格四室居设计古典风格四室居设计',
				imgPath:'dist/img/10.png'
			}]
		}]
		res.render('cases', {
			navigator: navigator,
			contact: contact,
			cases: cases
		})
	})
}

// 查看案例轮播
exports.getCasesShow = function(req, res){
	res.send({
		
	})
}

// 企业新闻
exports.news = function (req, res) {
	async.parallel([
		/*// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// commonTop
		function(cb){
			
		},
		// teamsTabs
		function(cb){
			
		}*/], 
	function(err, results){
		//var navigator = results[0];
		var navigator=[{
			name:'团队成员',
			sort:'1',
			remark:'teams',
			url:'/teams'
		},{
			name:'关于我们',
			sort:'1',
			remark:'abouts',
			url:'/aboutus'
		},{
			name:'服务案例',
			sort:'1',
			remark:'cases',
			url:'/cases'
		},{
			name:'企业新闻',
			sort:'1',
			remark:'news',
			url:'/news'
		},{
			name:'联系我们',
			sort:'1',
			remark:'contactus',
			url:'/contactus'
		}];
		var contact={
			title:'联系我们',
			sub:'Contact us',
			phone:'0123-12345677',
			fax:'0123-12345677',
			address:'深圳市宝安区西乡流塘新村6巷10号'
		}
		var news={
			totals:100,
			pages:10,
			newsList:[{
				id:0,
				imgPath:'dist/img/18.png',
				title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				id:1,
				imgPath:'dist/img/19.png',
				title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				id:2,
				imgPath:'dist/img/20.png',
				title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				id:3,
				imgPath:'dist/img/20.png',
				title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				id:4,
				imgPath:'dist/img/19.png',
				title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			},{
				id:5,
				imgPath:'dist/img/18.png',
				title:'郑州高校新食堂“致青春”逆天 装修风格文艺范',
				time:'2016-10-14 14:15:24',
				txt:'餐厅取名为“致青春”，正中间装饰了一棵高大的人造树，“藤蔓”、装饰架、壁画散落在各处，配以暖色照明灯，整个食堂文艺范爆棚。'
			}]
		};
		res.render('news', {
			navigator: navigator,
			contact: contact,
			news:news
		})
	})
}

// 联系我们
exports.contactus = function (req, res) {
	async.parallel([
		/*// 导航
		function(cb){
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		// commonTop
		function(cb){
			
		},
		// teamsTabs
		function(cb){
			
		}*/],
	function(err, results){
		//var navigator = results[0];
		var navigator=[{
			name:'团队成员',
			sort:'1',
			remark:'teams',
			url:'/teams'
		},{
			name:'关于我们',
			sort:'1',
			remark:'abouts',
			url:'/aboutus'
		},{
			name:'服务案例',
			sort:'1',
			remark:'cases',
			url:'/cases'
		},{
			name:'企业新闻',
			sort:'1',
			remark:'news',
			url:'/news'
		},{
			name:'联系我们',
			sort:'1',
			remark:'contactus',
			url:'/contactus'
		}];
		var contact={
			title:'联系我们',
			sub:'Contact us',
			phone:'0123-12345677',
			fax:'0123-12345677',
			address:'深圳市宝安区西乡流塘新村6巷10号'
		}
		res.render('contactus', {
			navigator: navigator,
			contact: contact
		})
	})
}