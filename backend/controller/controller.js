const model = require('../models/model');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const jwtKey = 'e-comm';

//    post: http://localhost:8080/api/categories
async function create_Categories(req,res){
//     {
//     type: "Savings",
//     color: "rgb(255, 99, 132)"
// },{
// type: "Investment",
//     color: "#FCBE44"
// }
    const Create = new model.Categories({
        type:"Expense",
        color:"rgb(54, 162, 235)"
    })
 
     await Create.save(function(err){
        if (!err) return res.json(Create);
        return res.status(400).json({ message : `Error while creating categories ${err}`});
    });
}


//  get: http://localhost:8080/api/categories
async function  get_Categories(req, res){
    let data = await model.Categories.find({})

    let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color}));
    return res.json(filter);
}

//  post: http://localhost:8080/api/transaction
async function create_Transaction(req, res){
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let { name, type, amount } = req.body;
    
    
    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );

    create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({ message : `Error while creating transaction ${err}`});
    });

}

//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res){
    if (!{_id: req.params.id}) res.status(400).json({ message: "Request body not Found"});
    await model.Transaction.deleteOne({_id: req.params.id}, function(err){
        if(!err) res.json("Record Deleted...!");
    }).clone().catch(function(err){ res.json("Error while deleting Transaction Record")});
}

//  get: http://localhost:8080/api/labels
async function get_Labels(req, res){

    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color'],date: v.date}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })
}

// post: http://localhost:8080/api/signup
async function create_User(req, res){
    let user = new User(req.body);
    let result = await user.save();
    result =  result.toObject();
    delete result.password;
    jwt.sign({result},jwtKey,{expiresIn: "2h"},(err,token)=>{
        if(err){
            res.send({result: "something went wrong"})
        }
        res.send({result,auth: token});
    })
}

// post: http://localhost:8080/api/login
async function user_Login(req,res){
    if(req.body.password && req.body.email){
        let user =await User.findOne(req.body).select("-password") ;
    if(user){
        jwt.sign({user},jwtKey,{expiresIn: "2h"},(err,token)=>{
            if(err){
                res.send({result: "something went wrong"})
            }
            res.send({user,auth: token});
        })
        
    }else{
        res.send({result: "No user found"})
    }
    }else{
        res.send({result: "No result found"})
    }  
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels,
    create_User,
    user_Login
}