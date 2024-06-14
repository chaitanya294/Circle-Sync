const express = require("express");
const router = express.Router();
router.use(express.json());

router.use('/signup' ,require("./Authentication/signup.js"));
router.use('/signin', require("./Authentication/signin.js"));
router.use('/checker', require("./Authentication/checker.js"));
router.use('/getGroups', require("./Groups/getGroups.js"));
router.use('/getId', require("./Authentication/getId.js"));
router.use('/updateSubject', require("./Subjects/updateSubject.js"));
router.use('/getData' , require("./Groups/getData.js"));
router.use('/addSubjects', require("./Subjects/addSubjects.js"));
router.use('/getSubjects', require("./Subjects/getSubjects.js"));
router.use('/joinGrp', require("./Groups/joinGrp.js"));
router.use('/setMessages', require("./Groups/setMessages.js"));
router.use('/getMessages', require("./Groups/getMessages.js"));
router.use('/leaveGrp', require("./Groups/leaveGrp.js"));
router.use('/getRanking', require("./Groups/getRanking.js"));
router.use('/resetSubject', require("./Subjects/resetSubject.js"));
router.use('/createGrp', require("./Groups/createGrp.js"));
router.use('/deleteSubjects', require("./Subjects/deleteSubjects.js"));

module.exports = router;