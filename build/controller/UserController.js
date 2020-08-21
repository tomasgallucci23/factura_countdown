"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var UserController = /** @class */ (function () {
    function UserController() {
        this.path = '/usuarios';
        this.router = express.Router();
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.initializeRoutes();
    }
    UserController.prototype.initializeRoutes = function () {
        // UserController middleware
        this.router.use(this.validateInput);
        // Controller endpoints
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path + '/create', this.createUser);
        this.router.get(this.path + '/:id', this.getUser);
        this.router.put(this.path + '/:id', this.updateUser);
        this.router.delete(this.path + '/:id', this.deleteUser);
    };
    UserController.prototype.validateInput = function (req, res, next) {
        var params = { id: req.url.split('/')[2] };
        switch (req.method) {
            case 'GET':
                break;
            case 'DELETE':
                if (!params.id) {
                    return res.status(400).json({ message: 'Id is required' });
                }
                break;
            case 'POST':
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).json({ message: "Request body can't be empty" });
                }
                break;
            case 'PUT':
                if (!params.id) {
                    return res.status(400).json({ message: 'Id is required' });
                }
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).json({ message: "Request body can't be empty" });
                }
                break;
        }
        next();
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, user, error, EmailError;
            return __generator(this, function (_a) {
                userData = req.body;
                user = new User_1.User();
                error = {};
                EmailError = [];
                // if (!Validator.matches(userData.name, '/^[az-AZ')) {
                //   error['name'] = {
                //     message: 'Name has to be a string.',
                //     value: userData.name,
                //   };
                // } else if (Validator.isEmpty(userData.name)) {
                //   error['name'] = {
                //     message: 'Name is required.',
                //   };
                // }
                // if (!Validator.matches(userData.lastname, '/^[az-AZ')) {
                //   error['lastname'] = {
                //     message: 'Lastname has to be a string.',
                //     value: userData.lastname,
                //   };
                // } else if (Validator.isEmpty(userData.lastname)) {
                //   error['lastname'] = {
                //     message: 'Lastname is required.',
                //   };
                // }
                // if (Validator.isEmpty(userData.email)) {
                //   error['email'] = {
                //     message: 'Email is required.',
                //   };
                // } else {
                //   if (!Validator.matches(userData.email, '/^[az-AZ')) {
                //     EmailError.push({
                //       message: 'Email has to be a string.',
                //     });
                //   } else if (!Validator.isEmail(userData.email)) {
                //     EmailError.push({
                //       message: 'Email has to be a format email.',
                //     });
                //   }
                //   let uniqueMail = await this.userRepository.findOneOrFail({ email: userData.email });
                //   if (!isNullOrUndefined(uniqueMail)) {
                //     EmailError.push({
                //       message: 'User found with this email.',
                //     });
                //   }
                //   error['email'] = {
                //     message: 'Email errors',
                //     errors: EmailError,
                //     value: userData.email,
                //   };
                // }
                // if (!isDate(userData.date_birthday)) {
                //   error['date_birthday'] = {
                //     message: 'Date birthday has to be a valid date.',
                //     value: userData.date_birthday,
                //   };
                // } else if (Validator.isEmpty(userData.date_birthday)) {
                //   error['date_birthday'] = {
                //     message: 'Date birthday is required.',
                //   };
                // }
                // if (!Validator.isNumeric(userData.phone)) {
                //   error['phone'] = {
                //     message: 'Phone has to be a numeric.',
                //   };
                // } else if (Validator.isEmpty(userData.phone)) {
                //   error['phone'] = {
                //     message: 'Phone is required.',
                //   };
                // }
                // if (Validator.isEmpty(userData.description)) {
                //   userData.description = '';
                // }
                // if (error) {
                //   return res
                //     .json({
                //       errors: error,
                //       message: 'An error occurred when validating',
                //     })
                //     .send(console.log(!Validator.isAlpha(userData.name)))
                //     .status(400);
                // } else {
                user.name = userData.name;
                user.lastname = userData.lastname;
                user.email = userData.email;
                user.date_birthday = userData.date_birthday;
                user.description = userData.description;
                user.phone = userData.phone;
                this.userRepository.save(user);
                return [2 /*return*/, res.status(201).json({ message: 'User created', user: user })];
            });
        });
    };
    UserController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.find()];
                    case 1:
                        clients = _a.sent();
                        console.log(clients);
                        if (clients.length > 0) {
                            return [2 /*return*/, res.status(200).json(JSON.stringify(clients))];
                        }
                        else if (clients.length === 0) {
                            return [2 /*return*/, res.status(400).json({ message: 'Users not found or not created' })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(req.params.id)];
                    case 1:
                        user = _a.sent();
                        if (user !== undefined) {
                            return [2 /*return*/, res.status(200).json(user)];
                        }
                        return [2 /*return*/, res.status(400).json({ message: 'User not found' })];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(req.params.id)];
                    case 1:
                        user = _a.sent();
                        if (!(user !== undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.update(req.params.id, req.body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'User updated correctly' })];
                    case 3: return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(req.params.id)];
                    case 1:
                        user = _a.sent();
                        if (user !== undefined) {
                            this.userRepository.delete(req.params.id);
                            return [2 /*return*/, res.status(200).json({ message: 'User deleted successfully' })];
                        }
                        return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map