var mongodb = require("mongodb");


var server_options={
	'auto_reconnect':false,
	poolSize:1
};
var db_options={
	w:-1
};
var mongoserver = new mongodb.Server('10.9.157.32', 27017, server_options );
var db=new mongodb.Db('test', mongoserver, db_options);
db.open(function(err,db){
    var res = {
    	test:1
   	};
   	var foo = db.collection('foo');
    // foo.save(res,function(err,result){
    //     console.log(result);
    // });

    // for(var key in foo){
    // 	console.log(key);
    // }

    //鏌ヨ
    foo.find().toArray(function(err,result){
    	console.log(result);
    });

    // var whereStr = Object.assign({},res);
    // var updateStr = {
    // 	$set: Object.assign({},whereStr,{ "age" : 100 })
   	// };
    // foo.update(whereStr,updateStr, function(err, result) {
    //     if(err){
    //         console.log('Error:'+ err);
    //         return;
    //     }  
    // });


 //    var whereStr = Object.assign({},res);
	// foo.remove(whereStr, function(err, result) {
	//     if(err){
	//       console.log('Error:'+ err);
	//       return;
	//     }     
	//     console.log(result);
	// });
});