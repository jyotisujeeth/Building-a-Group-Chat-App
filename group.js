const path = require('path');

const express = require('express');


const router = express.Router();



const userAuth=require('../middleware/auth');
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
const Message = require('../models/message');
const User = require('../models/user');
const Group=require('../models/group')
const Usergroup=require('../models/usergroup')


exports.createGroup=async (req, res, next) => {
    const groupname=req.body.groupname;
    console.log(groupname);
    
    console.log("the user id group=====>",req.user.id);
    const data= await Group.create({groupname, userId : req.user.id})
    console.log("the group id group=====>",data.dataValues.id);
    const usrgrp=await Usergroup.create({is_admin : true, groupId : data.dataValues.id, userId : req.user.id, userName: req.user.name, groupName:groupname})
    res.status(201).json({newGroupDetail:usrgrp})
}

exports.getGroups=async(req,res)=>{
    const groups = await Usergroup.findAll({where:{userId:req.user.id}});
    // console.log("All groups =>",groups)
    res.status(200).json({allGroups:groups})
}

exports.getGroupUsers=async(req,res)=>{
    gId=req.params.groupId;
    console.log("groupupid=>",gId);
    const allgroupusers=await Usergroup.findAll({where:{groupId:gId}});
    console.log(allgroupusers);
    res.status(200).json({allgrpusr:allgroupusers})
}

exports.addUserToGroup=async (req, res, next) =>{
    
    try{
      const usrname= req.body.usrname;
      const addis_admin=req.body.is_admin;
      const groupName=req.body.groupName;
      const uid=req.user.id;
      console.log("is_admin=====>",addis_admin)
      console.log("jvgvhjsjhbsjhv usrname",usrname)
      console.log("jvvgsugs group name",groupName)
      var addusrid;
      var addgrpid;
      verusrname= await User.findAll({where:{name:usrname}})
      console.log("verusrname=====>",verusrname[0].id)
      addusrid=verusrname[0].id;

      vergroupname=await Group.findAll({where:{groupname:groupName}})
      console.log("vergroupname===>",vergroupname[0].id)
      addgrpid=vergroupname[0].id
      verisadmin=await Usergroup.findAll({where:{userId:uid, groupId:addgrpid}})
      console.log("verisadmin=====>",verisadmin)
      if(verisadmin[0].is_admin){
        if(addis_admin=="Yes"){
          Usergroup.create({is_admin:true,userName:usrname,groupName:groupName,groupId:addgrpid,userId:addusrid})
        }
        else{
          Usergroup.create({is_admin:false,userName:usrname,groupName:groupName,groupId:addgrpid,userId:addusrid})
        }
      }
      res.status(201).json({newGroupusrid:addusrid})
    }
    catch(error){
      return res.status(403).json({ error, success: false } )
    }
    
  

  }

exports.deleteUser=async (req, res, next) =>{
  
    
    try {
      const uid = req.user.id
      const groupId=req.params.groupId;
      const userId=req.params.userId;
      console.log("all delete user details",uid, groupId,userId)
      const checkAdmin = await Usergroup.findAll({
          where: {
              groupId: groupId,
              userId: uid
          }
      })
      console.log("check admin====>",checkAdmin[0].is_admin)
      
      
      if (checkAdmin[0].is_admin) {
          const deleteUser = await Usergroup.destroy({
              where: {
                  userId: userId,
                  groupId: groupId
              }
          })
          if (deleteUser) {
              return res.status(201).json({ message: "user deleleted" })
          }
      }
      else if(uid==userId){
        const deleteUser = await Usergroup.destroy({
          where: {
              userId: userId,
              groupId: groupId
          }
        })
        if (deleteUser) {
            return res.status(201).json({ message: "user deleleted" })
        }
      }
      else{
          res.status(200).json({ err: "you are not admin of this group" })
      }
    } 
    catch (err) {
      console.log(err)
      res.status(401).json({ err: "user not deleted" })
    }
    
  }

exports.deleteGroup=async (req, res, next) =>{
    try{
      const groupId=req.params.groupId;
    const uid=req.user.id;
    console.log("group id in delete group",groupId)
    const checkowner=await Group.findAll({
      where: {
          id: groupId,
          userId: uid
      }
    })
    console.log("check owner=====>",checkowner)
    if(checkowner[0]){
      const deleteGroup = await Group.destroy({
        where: {
            id:groupId
        }
      })
      if (deleteGroup) {
          return res.status(201).json({ message: "group deleleted" })
      }
    }
    else{
      res.status(200).json({ err: "you are not owner of this group" })
    }
    }
    catch (err) {
      console.log(err)
      res.status(401).json({ err: "group not deleted" })
    }
  
  }