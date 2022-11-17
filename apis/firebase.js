import { initializeApp } from 'firebase/app';
import { getDatabase, ref} from 'firebase/database';
import keys from './keys'

initializeApp(keys.firebaseConfig);
const dbRef = ref(getDatabase());

export default dbRef

