//express
const express=require('express');
const app=express();

//body-parser
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//path
const path=require('path');
app.use(express.static(path.join(__dirname,'./dist/MREM')))
//json token
const jwt=require('jsonwebtoken');
//bcrypt
const bcrypt=require('bcrypt')
//mongobd
const mc=require('mongodb').MongoClient;

const mongourl="mongodb+srv://shivareddy:shiva970@cluster0-h8shp.mongodb.net/test?retryWrites=true&w=majority";

//variables to take data from mongodb
var adminloginCollection;
var studentloginCollection;
var lecturerloginCollection;
var attendance;
mc.connect(mongourl,{useNewUrlParser:true ,useUnifiedTopology:true},(err,client)=>{
if(err){
    console.log("error in connection",err);
}
else{
    var dbo=client.db("gopidi")
    adminloginCollection=dbo.collection("admin")
    lecturerloginCollection=dbo.collection("lecture")
    studentloginCollection=dbo.collection("student")
    attendance=dbo.collection("attendance")
    console.log("connected successfully");
}
})
//cloudinary
const cloudinary=require("cloudinary");
const cloudinaryStorage=require("multer-storage-cloudinary");
const multer=require("multer");
//: configure cloudinary into your server
cloudinary.config({
    cloud_name:"dcayumrax",
    api_key:"268852348624595",
    api_secret:"6ULoMIGyzPznoSF6T-ipcLKADR0"
    })

// create cloudinaryStorage like below
    var storage=cloudinaryStorage({
        cloudinary:cloudinary,
        folder:"vms pics",
        allowedFormats:["jpeg","jpg","png"],
        filename:function(req,file,cb){
        cb(undefined,file.fieldname+"-"+Date.now());
        }
       })

//cloudinary storage variable passed into multer storage
var parser = multer({ storage: storage });

//admin login
app.post("/adminLogin",(req,res)=>{
    adminloginCollection.findOne({aid:req.body.username,pass:req.body.password},(err,result)=>{
        if(err){
            console.log("error in checking admin data",err);
        }
        else if(result!=null){
            jwt.sign({aid:result.aid},'secret',{expiresIn:"6h"},(err,admintoken)=>{
                if(err){
                   console.log("err in read");
                   
                }
              else{
                res.json({message:"admin logged successfully",token:admintoken})
                   
               }
           })
        }
        else{
            res.json({message:"No username and password"})
        }
    })
})
//-----------------------------------------------------------------------------
//admin profile
app.get("/adminProfile/:id",(req,res)=>{
    adminId=(req.params.id)
    adminloginCollection.find({aid:adminId}).toArray((err,result)=>{
        
        if(err)
        {
            console.log("err during find");
        }
        else
        {
            res.json({message:result})
        }
    })
})
//admin update
app.put("/updateadmin",(req,res)=>{
    console.log(req.body)
    adminloginCollection.updateOne({aid:req.body.aid},{$set:{user:req.body.user,phonenumber:req.body.phonenumber,email:req.body.email,address:req.body.address}},(err,result)=>{
        if(err){
            console.log("error",err);
        }
        else{
            res.json({message:"update done"})
        }
    })
})
//------------------------------------------------------------------------
//add lecturer data
app.post("/postEmpObj",(req,res)=>{
    var empObj=req.body
    lecturerloginCollection.findOne({lid:empObj.lid},(err,empData)=>{
        if(err){
            console.log("error during find data",err);    
        }
        else if(empData!=null){
            res.json({message:"already exists"})
        }
        else{
            bcrypt.hash(req.body.password,8,(err,shashedpassword)=>{
                if(err){
                    console.log("error during hashing",err)
                }
                else{
                    req.body.password=shashedpassword;
                    lecturerloginCollection.insertOne(empObj,(err,result)=>{
                        if(err){
                            console.log("error during posting",err)
                        }
                        else{
                            res.json({message:"record saved successfully"})
                        }
                    })
                }
            })
           
        }
    })
})
//admin module lecturer get
app.get("/readEmpData",(req,res)=>{
    lecturerloginCollection.find().toArray((err,dataArray1)=>{
        if(err){
            console.log("error during find",err);
        }
        else if(dataArray1.length==0)
        {
            res.json({message:"no object found"})
            
        }
        else{
            res.json({message:dataArray1})
        }

    })

})

//admin module lecturer put
app.put('/updateEmpData',(req,res)=>{
    lecturerloginCollection.updateOne({lid:req.body.lid},{$set:{user:req.body.user ,phonenumber:req.body.phonenumber,subject:req.body.subject}},(err,result)=>{
        if(err){
            console.log("error during update",err)
        }
        else{
            //read latest data after update and send it to client
            lecturerloginCollection.find().toArray((err,lecArray)=>{
                if(err){
                    console.log("error during setting",err)
                }
                else{
                    res.json({message:lecArray})
                }


            })

            }
        }
    )
    })

    //admin module lecturer delete
 app.delete('/removelecturer/:lid',(req,res)=>{
        lecturerloginCollection.deleteOne({lid:req.params.lid},(err,delsecdata)=>{
           if(err)
           {
               console.log("error in read");
               
           }
           else
           {
            lecturerloginCollection.find().toArray((err,dataArray2)=>{
                   if(err)
                   {
                       console.log("error during finding");
                   }
                   else
                   {
                       res.json({message:dataArray2})
                   }
               })
           }
       })
    })
//------------------------------------------------------------------------------
//add studentData
app.post('/postStdObj',(req,res)=>{
    var empObj=req.body;
    var att=empObj.sid;
    console.log(att)
    studentloginCollection.findOne({sid:empObj.sid},(err,stdData)=>{
        if(err){
            console.log("error during find data",err);    
        }
        else if(stdData!=null){
            res.json({message:"already exists"})
        }
        else{
            bcrypt.hash(req.body.password,8,(err,shashedpassword)=>{
                if(err){
                    console.log("error during hashing",err)
                }
                else{
                    req.body.password=shashedpassword;
                   
                    studentloginCollection.insertOne(empObj,(err,result)=>{
                        if(err){
                            console.log("error during posting",err)
                        }
                        else{
                            attendance.insertOne({sid:att,att:0,abs:0,total:0},(err,result)=>{
                                if(err){
                                    console.log("error",err)
                                }
                                else{
                                    res.json({message:"student record saved successfully"})
                                }
                            })
                           
                           
                        }
                    })
                }
            })           
        }
    })
})
//student attendance
app.get("/attendance/:id",(req,res)=>{
    attendance.find({sid:req.params.id}).toArray((err,dataArray1)=>{
        if(err){
            console.log("error during find",err);
        }
        else if(dataArray1.length==0)
        {
            res.json({message:"no object found"})
            
        }
        else{
            res.json({message:dataArray1})
        }

    })

})
//admin and lecturer module studentData get
app.get("/readStdData",(req,res)=>{
    studentloginCollection.find().toArray((err,dataArray1)=>{
        if(err){
            console.log("error during find",err);
        }
        else if(dataArray1.length==0)
        {
            res.json({message:"no object found"})
            
        }
        else{
            res.json({message:dataArray1})
        }

    })

})

//admin and lecturer module to put studentData
app.put("/updateStdData",(req,res)=>{
    studentloginCollection.updateOne({sid:req.body.sid},{$set:{user:req.body.user ,phonenumber:req.body.phonenumber,email:req.body.email}},(err,result)=>{
        if(err){
            console.log("error during update",err)
        }
        else{
            //read latest data after update and send it to client
            studentloginCollection.find().toArray((err,stdArray)=>{
                if(err){
                    console.log("error during setting",err)
                }
                else{
                    res.json({message:stdArray})
                }
            })
            }
        }
    )
    })

    //admin and lecturer modules delete studentData
 app.delete('/removeStudent/:sid',(req,res)=>{
    studentloginCollection.deleteOne({sid:req.params.sid},(err,delstddata)=>{
           if(err)
           {
               console.log("error in read");
               
           }
           else
           {
            studentloginCollection.find().toArray((err,dataArray2)=>{
                   if(err)
                   {
                       console.log("error during finding");
                   }
                   else
                   {
                       res.json({message:dataArray2})
                   }
               })
           }
       })
    })

//---------------------------------------------------------------------------
//lecturer login
app.post("/lecturerLogin",(req,res)=>{
    lecturerloginCollection.findOne({lid:req.body.username},(err,result)=>{
        if(err){
            console.log("error in checking lecturer data",err);
        }
        else if(result==null){
            res.json({message:"invalid username"})
        }
        else{
            bcrypt.compare(req.body.password,result.password,(err,mstatus)=>{
                if(err){
                    console.log("err in status",err);
                    
                }
                else if(mstatus==false){
                    res.json({message:"invalid password"})
                }
                else{
                    jwt.sign({lid:result.username},'secret',{expiresIn:"6h"},(err,signedtoken)=>{
                        if(err){
                           console.log("err in read");
                           
                        }
                      else{
                           res.json({lecObj:result,message:"lecturer logged successfully",token:signedtoken})
                           
                       }
                   })
                }
            })
        }    
    })
})
//--------------------------------------------------------------------------------------------
//lecturer profile
app.get("/lecturerProfile/:id",(req,res)=>{
    lecturerId=(req.params.id)
    lecturerloginCollection.find({lid:lecturerId}).toArray((err,result)=>{
        
        if(err)
        {
            console.log("err during find");
        }
        else
        {
            res.json({message:result})
        }
    })
})
//lecturer update
app.put("/updatelecturer",(req,res)=>{
    lecturerloginCollection.updateOne({lid:req.body.lid},{$set:req.body},(err,result)=>{
        if(err){
            console.log("error",err);
        }
        else{
            lecturerloginCollection.find().toArray((err,updata)=>{
                if(err){
                    console.log("error during setting",err)
                }
                else{
                    
                    res.json({message:updata})
                }
            })
        }
    })
})


//------------------------------------------------------------------------
//student login
app.post("/studentLogin",(req,res)=>{
    studentloginCollection.findOne({sid:req.body.username},(err,result)=>{
        if(err){
            console.log("error in checking student data",err);
        }
        else if(result==null){
            res.json({message:"invalid username"})
        }
        else{
            bcrypt.compare(req.body.password,result.password,(err,mstatus)=>{
                if(err){
                    console.log("err in status",err);
                    
                }
                else if(mstatus==false){
                    res.json({message:"invalid password"})
                }
                else{
                    jwt.sign({sid:result.username},'secret',{expiresIn:"6h"},(err,signedtoken)=>{
                        if(err){
                           console.log("err in read");
                           
                        }
                      else{
                           res.json({stdObj:result,message:"student logged sucessfully",token:signedtoken})
                           
                       }
                   })
                }
            })
        }    
    })
})
//--------------------------------------------------------------------------------------------
//student profile
app.get("/studentProfile/:id",(req,res)=>{
    studentId=(req.params.id)
    studentloginCollection.find({sid:studentId}).toArray((err,result)=>{
        
        if(err)
        {
            console.log("err during find");
        }
        else
        {
            res.json({message:result})
        }
    })
})
//lecturer update
app.put("/updatestudent",(req,res)=>{
    studentloginCollection.updateOne({sid:req.body.sid},{$set:req.body},(err,result)=>{
        if(err){
            console.log("error",err);
        }
        else{
            studentloginCollection.find().toArray((err,updata)=>{
                if(err){
                    console.log("error during setting",err)
                }
                else{
                    
                    res.json({message:updata})
                }
            })
        }
    })
})





const port=3000
app.listen(port,()=>{
console.log("runing");
})