const Rozarpay=require('razorpay');

const Order=require('../Model/purchase');

const { generateAccessToken } = require('../Controller/signInController')


const purchasepremium=async(req,res,next)=>{
    try{
        var rzp=new Rozarpay({
            key_id:process.env.razorPay_key_id,
            key_secret:process.env.razorPay_key_secret
        })

        const amount=2500;

        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            }).catch(err=>{
                throw new Error(err)
            })
        })


    }catch(err){
        console.log(err)
        res.status(403).json({message:"something wrong",error:err})
    }
}

const updatetransactionstatus=async(req,res,next)=>{
    try{
        const userId = req.user.id;
        const userName = req.user.name;
        const {payment_id,order_id}=req.body;
        console.log("on successfull state or not:",payment_id)
        console.log(payment_id,order_id)
        const order=await Order.findOne({where:{orderid:order_id}})
        if(!order){
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        if(payment_id=== null){
            const promise1=await order.update({paymentid:payment_id,status:'FAILED'})
            const promise2 = await req.user.update({ispremium:false})
            Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:false,message:'transaction'});
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({ success: false, message: 'Transaction update failed' });
        })
        }else{
            const promise1=await order.update({paymentid:payment_id,status:'SUCCESSFUL'})
            const promise2 = await req.user.update({ispremium:true})
            Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:true,message:'transaction successfull',token:generateAccessToken(userId,userName,true)});
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({ success: false, message: 'Transaction update failed' });
        })
        }

                
    }catch(err){
        console.log(err)
        throw new Error(err);
    }
}

module.exports = {purchasepremium , updatetransactionstatus}