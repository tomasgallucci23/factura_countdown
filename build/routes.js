"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("./controller/UserController");
var TwillioController_1 = require("./controller/TwillioController");
var BirthdayController_1 = require("./controller/BirthdayController");
exports.Routes = [
    {
        method: 'get',
        route: '/usuarios',
        controller: UserController_1.UserController,
        action: 'getAllUsers',
    },
    {
        method: 'get',
        route: '/usuarios/:id',
        controller: UserController_1.UserController,
        action: 'getUser',
    },
    {
        method: 'post',
        route: '/usuarios/create',
        controller: UserController_1.UserController,
        action: 'createUser',
    },
    {
        method: 'put',
        route: '/usuarios/:id',
        controller: UserController_1.UserController,
        action: 'updateUser',
    },
    {
        method: 'delete',
        route: '/usuarios/:id',
        controller: UserController_1.UserController,
        action: 'deleteUser',
    },
    {
        method: 'post',
        route: '/twilio/sendSms/:id',
        controller: TwillioController_1.TwillioController,
        action: 'sendMessage',
    },
    {
        method: 'get',
        route: '/getProximaFecha',
        controller: BirthdayController_1.BirthdayController,
        action: 'getNextBirthday',
    },
];
//# sourceMappingURL=routes.js.map