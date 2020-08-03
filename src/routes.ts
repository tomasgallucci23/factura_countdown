import { UserController } from './controller/UserController';
import { TwillioController } from './controller/TwillioController';
import { BirthdayController } from './controller/BirthdayController';
export const Routes = [
  {
    method: 'get',
    route: '/usuarios',
    controller: UserController,
    action: 'getAllUsers',
  },
  {
    method: 'get',
    route: '/usuarios/:id',
    controller: UserController,
    action: 'getUser',
  },
  {
    method: 'post',
    route: '/usuarios/create',
    controller: UserController,
    action: 'createUser',
  },
  {
    method: 'put',
    route: '/usuarios/:id',
    controller: UserController,
    action: 'updateUser',
  },
  {
    method: 'delete',
    route: '/usuarios/:id',
    controller: UserController,
    action: 'deleteUser',
  },
  {
    method: 'post',
    route: '/twilio/sendSms/:id',
    controller: TwillioController,
    action: 'sendMessage',
  },
  {
    method: 'get',
    route: '/getProximaFecha',
    controller: BirthdayController,
    action: 'getNextBirthday',
  },
  {
    method: 'get',
    route: '/getProximaFech',
    controller: BirthdayController,
    action: 'getProximoCumpleanios',
  },
];
