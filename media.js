const S3Services=require('../services/s3group')
const chat=require("../models/message")
const AWS = require('aws-sdk');
const postmedia=async(req,res,next)=>{
    try {
        const user = req.user
        const username = req.user.name;
        const groupid=req.params.groupid
        const fileData = req.body.file
        console.log("file data",fileData);

        const stringified = JSON.stringify(fileData);

        const fileName = `mediachat${user.id}/${new Date()}.txt`;

    
        const fileURL = await S3Services.uploadS3(stringified, fileName)
        console.log("file url========>",fileURL)
        if (groupid==0) {
            const response = await user.createMessage({ message: fileURL, Username: username })
            if (response) {
                res.status(201).json({ fileURL, success: true })
            }
        } else {
            const response = await user.createMessage({ message: message, Username: username,groupId:groupid })
            if (response) {
                res.status(201).json({ fileURL, success: true })
            }
        }
    
    } catch (err) {
        res.status(401).json({ success: false, err: err })
        console.log(err)
    }
    
}

module.exports={
    postmedia:postmedia
}

// function uploadToS3(data,filename){
//     const BUCKET_NAME=process.env.BUCKET_NAME
//     const IAM_USER_KEY=process.env.IAM_USER_KEY
//     const IAM_SECRET_KEY=process.env.IAM_SECRET_KEY

//     let s3bucket=new AWS.S3({
//         accessKeyId:IAM_USER_KEY,
//         secretAccessKey:IAM_SECRET_KEY,
//         Bucket:BUCKET_NAME
//     })

    
//         var params={
//             Bucket:BUCKET_NAME,
//             Key:filename,
//             Body:data,
//             ACL:'public-read'
//         }

//         return new Promise((resolve,reject)=>{
//             s3bucket.upload(params,(err,s3response)=>{
//                 if(err){
//                     console.log("Somethin went wrong",err);
//                     reject(err);
//                 }
//                 else{
//                     console.log("SUCESS",s3response);
//                     resolve(s3response.Location);
//                 }
//             })
//         })
        

// }



// exports.postmedia=async(req,res,next)=>{
//     const expenses=await req.user.getExpenses();
//     console.log("expenses=======>",expenses);
//     const stringfiedExpenses=JSON.stringify(expenses);
//     const userId=req.user.id;
//     const filename=`Expense${userId}/${new Date()}.txt`;
//     const fileURL=await uploadToS3(stringfiedExpenses,filename);
//     res.status(200).json({fileURL, sucess:true})
// }