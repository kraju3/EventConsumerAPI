const nodemailer = require('nodemailer');

const {EventModel} = require('../data/event');
const {ProductModel} = require('../data/product')



module.exports={
    execute: async(account)=>{
        const transport = nodemailer.createTransport({
            host:process.env.SERVERHOST.toString(),
            port:process.env.SERVERPORT,
            secure:false,
            auth:{
                user:process.env.SERVERUSERNAME.toString(),
                pass:process.env.SERVERPASSWORD.toString()
            }
        })
        
        let info = await transport.sendMail({
            from:`${process.env.SERVERUSERNAME}`,
            to:`${account.Email}`,
            subject:"Welcome to User Authentication",
            text:`Just a test for ${account.UserName}`,
            html:"<b>Welcome New User</b>"
        
        }).catch(async err=>{
            if(err){
                await new EventModel({
                    messageId:"",
                    info:{account,status:false},
                    url:""
                }).save(err=>{
                    if (err){
                        throw err
                    }
                })

            }
        });
        await new EventModel({
            messageId:account.UserName.toString(),
            info:{account,status:true},
            url:nodemailer.getTestMessageUrl(info).toString()}
        ).save((err,product)=>{
            if (err){
                throw err
            }
    
        console.log(product);

        console.log("Added event")
    
    
   
     });
    
    

    },
    executeProduct:async(product)=>{
        await new ProductModel({
            messageId:product.Id,
            info:{product,status:true},
            name:product.Name.toString()
        }
        ).save(async (err,product_)=>{
            if (err){
                await new ProductModel({
                    messageId:0,
                    info:{product,status:false},
                    name:""
                }).save(err=>{
                    if (err){
                        throw err
                    }
                })
            }
    
        console.log(product);

        console.log("Added Product")
    
    
   
     });
    }

}