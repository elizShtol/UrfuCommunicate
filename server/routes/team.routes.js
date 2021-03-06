const { Router } = require('express')
const multer = require('multer')
const router = Router()
const Team = require('../models/Team')
const User = require('../models/User')
const Message = require('../models/Message')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const getFileType = require('file-type')
const fs = require('fs')
const path = require('path')

router.post('/createTeam', auth,
    async (req, res) => {
        try {
            const students = []
            for (var i = 0; i < req.body.studentsList.length; i++) {
                students.push(req.body.studentsList[i].studentId)
            }
            const team = new Team({
                name: req.body.teamName, subject: req.body.subjectName,
                teacher: req.body.id, students: students, messages: [], description: req.body.description
            })
            await team.save()
            const teacher = await User.findById(req.body.id)
            teacher.teams.push(team)
            await teacher.save()
            for (var i = 0; i < students.length; i++) {
                const student = await User.findById(students[i]);
                student.teams.push(team)
                await student.save()
            }
            return res.status(200).json({
                data: {
                    group: {
                        groupId: team._id,
                        title: team.name,
                        description: team.description,
                        teacher: team.teacher,
                        messages: [
                        ],
                        studentsList: students
                    }
                },
                status: 'ok'
            }
            )
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (teacher group)' },
                    status: 'bad'
                })
        }
    });

router.post('/editTeam', auth,
    async (req, res) => {
        try {
            const team = await Team.findById(req.body.groupId)
            const students = []
            for (var i = 0; i < req.body.studentsList.length; i++) {
                var student = await User.findById(req.body.studentsList[i].studentId)
                students.push(student)
                var f = true;
                if (!student.teams.includes(team.id)) {
                    console.log('12')
                    student.teams.push(team)
                    await student.save()
                }
            }
            team.students = students
            await team.save()
            return res.status(200).json({
                data: {
                    group: {
                        groupId: team.objectId,
                        title: team.name,
                        description: team.description,
                        teacher: team.teacher,
                        messages: team.messages,
                        studentsList: students
                    }
                },
                status: 'ok'
            })
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (teacher group)' },
                    status: 'bad'
                })
        }
    });

router.post('/sendMessage', auth,
    async (req, res) => {
        try {
            var time = new Date().toString()
            const message = new Message({ text: req.body.msg, time: time })
            message.save()
            const team = await Team.findById(req.body.groupId)
            team.messages.push(message)
            team.save()
            return res.status(200).json(
                {
                    data: {
                        newMessage: {
                            text: message.text,
                            time: message.time.toLocaleString()
                        },
                    },
                    status: 'ok'
                })
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (teacher group)' },
                    status: 'bad'
                })
        }
    })



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file
        cb(null, originalname)
    }
})
const upload = multer({ storage: storage })


router.post(
    '/sendfile', 
    upload.single('filedata'),
    async (req, res) => {
        const fileName = req.file.filename
        console.log(req.body.teamId)
        const team = await Team.findById(req.body.teamId)
        if (!team.fileNames.includes(fileName)) {
            team.fileNames.push(fileName)
            team.save()
        }
        console.log(team)
        res.json({
            data: {
                file:
                {
                    fileName: fileName,
                    filePath: '',
                    getFileStatus: false
                }
            }, status: 'ok'
        })
    })


router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// router.use(express.static('./public'));
router.post(
    '/getFile',
    async (req, res) => {
        // console.log(req.body)
        var pathF = path.join(path.resolve(__dirname, '../../files'), req.body.data.fileName)
        console.log(pathF)
        res.download(pathF, req.body.data.fileName)

    })

    router.post(
        '/deleteFile',
        async (req, res) => {
            console.log(req.body)
            var pathF = path.join(path.resolve(__dirname, '../../files'), req.body.fileName)
            const team = await Team.findById(req.body.teamId)
            for(var i = 0; i < team.fileNames.length; i++) {
                if(team.fileNames[i] === req.body.fileName) {
                   team.fileNames.splice(i, 1);
                }
            }
            team.save()
            fs.unlink(pathF, (err) => {
                if (err) throw err;
                console.log('successfully deleted');
              });
            res.status(200).json({status:'ok'})
        })

router.post('/findStudent',
    async (req, res) => {
        try {
            const { searchValidValue } = req.body;
            const students = await User.find({ isTeacher: false, surname: searchValidValue })
            const studentsNames = []
            for (var i = 0; i < students.length; i++) {
                const student = students[i].surname + ' ' + students[i].name + ' ' + students[i].middleName
                studentsNames.push({
                    studentId: students[i]._id,
                    studentName: student, group: students[i].group
                })
            }

            return res.status(200).json(
                {
                    data: {
                        students: studentsNames
                    },
                    status: 'ok'
                })
        }
        catch (e) {
            return res.status(300).json(
                {
                    data: { message: 'Ошибка на сервере (find student)' },
                    status: 'bad'
                })
        }
    });

module.exports = router
