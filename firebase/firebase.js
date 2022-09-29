import { initializeApp } from 'firebase/app';
import { getDatabase, ref} from 'firebase/database';

const firebaseConfig = { //information removed for database security reasons
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

export default dbRef

