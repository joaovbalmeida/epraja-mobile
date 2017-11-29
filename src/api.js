import 'babel-polyfill';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import { AsyncStorage } from 'react-native';

const socket = io(process.env.BASE_URL, {
  transports: ['websocket'],
  forceNew: true
});

const feathersClient = feathers()
.configure(hooks())
.configure(socketio(socket))
.configure(auth({
  storage: AsyncStorage,
}));

export default {
  auth: feathersClient.authenticate,
  business: feathersClient.service('businesses'),
  menuCategories: feathersClient.service('menu-categories'),
  menuItems: feathersClient.service('menu-items')
};
