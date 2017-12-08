import 'babel-polyfill';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import { AsyncStorage } from 'react-native';

const socket = io(process.env.BASE_URL, {
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
  email: 'teste@teste.com',
  password: '123456'
}).catch(error => console.error('Error authenticating!', error));

export default {
  auth: feathersClient.authenticate,
  business: feathersClient.service('businesses'),
  menuCategories: feathersClient.service('menu-categories'),
  menuItems: feathersClient.service('menu-items'),
  menuItemStatuses: feathersClient.service('menu-item-statuses'),
  billStatuses: feathersClient.service('bill-statuses'),
  bills: feathersClient.service('bills'),
};
