// app/session-stores/application.js
import SessionStorageStore from 'ember-simple-auth/session-stores/session-storage';

export default class ApplicationSessionStore extends SessionStorageStore {
  storageType = 'sessionStorage';
}