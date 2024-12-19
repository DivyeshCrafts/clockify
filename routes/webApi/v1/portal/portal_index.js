let express = require('express');
let router = express.Router();

let userController = require('./user/userContoller');
let userValidation = require('./user/userValidation');
router.post('/webapi/v1/portal/register', userValidation.registerValidation, userController.register);
router.post('/webapi/v1/portal/login', userValidation.loginValidation, userController.login);

let todoController = require('./to_do/todoContoller');
let todoValidation = require('./to_do/todoValidation');
router.post('/webapi/v1/portal/create_todo_or_edit', todoValidation.create_todo_or_editValidation, todoController.create_todo_or_edit);
router.post('/webapi/v1/portal/user_todo_history_daywise', todoValidation.user_todo_history_daywiseValidation, todoController.user_todo_history_daywise);
router.post('/webapi/v1/portal/todo_daywise', todoValidation.todo_daywiseValidation, todoController.todo_daywise);

module.exports = router;
