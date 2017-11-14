import { Books } from './../controller/book';

import { mongo } from "./../controller/mongo";

const books = new Books();

class Main{
	constructor(app){
		//图书分类
		app.get("/cata/list",this.CataList);
		//图书内容
		app.get("/cata/content",this.CataContent);
		
		//添加突然分类
		app.post('/add/cata/type',this.addCataType);
		//查询图书的分类
		app.post('/select/cata/type',this.selectCataType);
	}
	
	//查询图书分类
	selectCataType(req,res){
		//获取请求的数据
		function getdata() {
			//get 形式数据
            let { query = {}, body = {}, params = {} } = req;
            return Object.assign({},query,params,body);
        };
        let where = getdata();
		mongo()
        	.then(function(db){
        		//打开数据库下的一个表
        		const foo = db.collection("foo");
        		//向表中添加数据
        		foo.find(where).toArray(function(error,result){
        			db.close();
        			if(error){
        				res.send({
        					"success" : false,
        					"message" : "查询失败"
        				});
        			}else{
        				res.send({
        					"success" : true,
        					"message" : "查询成功",
        					//本次向数据库添加的数据
        					"data" : result
        				});
        			}
        		});
        	});
	}
	
	//添加图书分类
	addCataType(req,res){
		//获取请求的数据
		function getdata() {
			//get 形式数据
            let { query = {}, body = {}, params = {} } = req;
            return Object.assign({},query,params,body);
        };
        let data = getdata();
        //获取 mongodb 数据对象
        mongo()
        	.then(function(db){
        		//打开数据库下的一个表
        		const foo = db.collection("foo");
        		//向表中添加数据
        		foo.save(data,function(error,result){
        			db.close();
        			if(error){
        				res.send({
        					"success" : false,
        					"message" : "数据添加失败"
        				});
        			}else{
        				res.send({
        					"success" : true,
        					"message" : "数据添加成功",
        					//本次向数据库添加的数据
        					"data" : result.ops
        				});
        			}
        		})
        	});
	}
	
	
	
	CataList(req,res){
		function callback(error, data){
			res.send(data);
		}
		books.getCatalog(callback);
	//  箭头函数
	//	books.getCatalog((error,data)=>{
	//		res.send(data);
	//	});
	}
	CataContent(req,res){
		//req.query 地址栏中的 get 行参
		let { id,pn = 0,rn = 30 } = req.query;
		function callback(error,data){
			res.send(data);
		}
		books.getBookContent({
			"catalog_id" : id,
			"pn" : pn,
			"rn" : rn
		},callback);
	}
}

export { Main };
