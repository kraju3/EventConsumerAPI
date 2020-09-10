var express = require('express');
var router = express.Router();

const {EventModel}=require('../data/event');
const {ProductModel} = require('../data/product')

const {EmailEvent} = require('../lib/emailEvent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Express");
});

router.post('/email',(req,res,next)=>{
    console.log(req.body)

    
    res.json({status:true});
})

router.get('/events',async (req,res,next)=>{
    var response = await EventModel.find().sort({_id:-1}).limit(10);

    var result = response.map(doc=>{
   
          let newObj = {
            id_:doc._id.toString(),
            id:doc.messageId,
            url:doc.url,
            info:doc.info
          }
          return newObj
    });1
    res.json(result)
    next()
},()=>{
  console.log(`GET Request from pid:${process.pid}`)
})


router.get('/products',async (req,res,next)=>{
  var docs = await ProductModel.find().sort({_id:-1}).limit(10);

  var result = docs.map(doc=> 
    {
      let newObj = {
        id_:doc._id.toString(),
        messageId:doc.messageId,
        name:doc.name,
        info:doc.info
      }
      return newObj
    }
    );
  

  res.json(result);

  next()
},()=>{
  console.log(`GET Request from pid:${process.pid}`)
});


router.delete('/products',async(req,res,next)=>{
  await ProductModel.deleteMany({});
  res.send("Deleted successfully");
  next()
},()=>{
  console.log(`DELETE/products Request from pid:${process.pid}`)
});

router.delete('/events',async(req,res,next)=>{
  await EventModel.deleteMany({});
  res.send("Deleted successfully");
  next()
},()=>{
  console.log(`DELETE/events Request from pid:${process.pid}`)
});


module.exports = router;