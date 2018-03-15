import 'babel-polyfill';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import { AsyncStorage } from 'react-native';

const socket = io('http://api.tapster.mhalmeida.com/', {
  transports: ['websocket'],
  forceNew: true,
});

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket, {
    timeout: 10000,
  }))
  .configure(auth({
    storage: AsyncStorage,
  }));

feathersClient.authenticate({
  strategy: 'local',
  email: 'marcos@gmail.com',
  password: '123456',
}).catch(error => error);

export default {
  auth: feathersClient.authenticate,
  business: feathersClient.service('businesses'),
  menuCategories: feathersClient.service('menu-categories'),
  menuItems: feathersClient.service('menu-items'),
  menuItemStatuses: feathersClient.service('menu-item-statuses'),
  billStatuses: feathersClient.service('bill-statuses'),
  bills: feathersClient.service('bills'),
  surveyRates: feathersClient.service('survey-rates'),
  surveys: feathersClient.service('surveys'),
};
