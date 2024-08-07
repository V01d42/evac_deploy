import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeFirestore } from 'firebase/firestore/lite';

const clientCredentials = {
  apiKey: 'AIzaSyBv_WzWv6070vvh4JlIsQ2rVEED-eKlyCw',
  authDomain: 'rakuten-web-app.firebaseapp.com',
  projectId: 'rakuten-web-app',
  storageBucket: 'rakuten-web-app.appspot.com',
  messagingSenderId: '1028699975297',
  appId: '1:1028699975297:web:35319acb0e31069497a780',
};

const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(clientCredentials);
initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
export const db = getFirestore(firebaseApp);
export default firebaseApp;
