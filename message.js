const path = require('path');

const express = require('express');


const router = express.Router();

const jwt = require('jsonwebtoken')

const userAuth=require('../middleware/auth');
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
const Message = require('../models/message');
const User = require('../models/user');
const messageController = require('../controllers/message');

router.post("/sendmsg/:groupId",userAuth.authenticate,messageController.sendMessage)

router.get("/getmessages",userAuth.authenticate,messageController.getMessages)


router.get("/getusers",userAuth.authenticate,messageController.getUsers)


router.get("/getgroupmessages/:groupId",userAuth.authenticate,messageController.getGroupMessages)



module.exports = router;