var express =  require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://divya12:qwerty123@ds159662.mlab.com:59662/my_site_dk',['coll1']);

router.get('/tasks', function(req,res,next){
     //res.send('TASK API');
     db.coll1.find(function(err,coll1){
     	if(err){
     		res.send(err);
     	}
     	res.json(coll1);
     });
});


router.get('/task/:id', function(req,res,next){
     //res.send('TASK API');
     db.coll1.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,coll2){
     	if(err){
     		res.send(err);
     	}
     	res.json(coll2);
     });
});

//save task
router.post('/task', function(req,res,next){
    
    var task = req.body;
    if(!task.title || !(task.isDone+'')){
    	res.status(400);
    	res.json({
    		"error" : "bad data"
    	});
    } else {
    	db.coll1.save(task, function(err,task){
    		if(err){
    			res.send(err);
    		}
    		res.json(task);
    	});
    }

});


//delete task

router.delete('/task/:id', function(req,res,next){
     //res.send('TASK API');
     db.coll1.remove({_id: mongojs.ObjectId(req.params.id)},function(err,coll2){
     	if(err){
     		res.send(err);
     	}
     	res.json(coll2);
     });
});


//update task
router.put('/task/:id', function(req,res,next){
 
   var task = req.body;
   var updTask = {};

   if(task.isDone){
   	updTask.isDone = task.isDone; 
   }

   if(task.title){
     updTask.title = task.title;
   }

   if(!updTask){
   	res.status(400);
   	res.json({
   		"error" : "bad data"
   	});
   }else{
   	db.coll1.update({_id:mongojs.ObjectId(req.params.id)}, updTask, {}, function(err,task){
   		if(err){
   			res.send(err);
   		}
   		res.json(task);
   	});
   }


});





module.exports = router;  
