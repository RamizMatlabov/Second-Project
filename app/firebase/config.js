import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA9pgixawEIlpFKDYJh1G7DDgmmaVW0-68",
  authDomain: "kapital-bank-dced8.firebaseapp.com",
  projectId: "kapital-bank-dced8",
  storageBucket: "kapital-bank-dced8.firebasestorage.app",
  messagingSenderId: "800838635551",
  appId: "1:800838635551:web:47172ebc7fec795d02852a"
};

// Проверка наличия необходимых переменных окружения
if (!firebaseConfig.apiKey) {
  console.error('Firebase API Key не найден. Пожалуйста, проверьте конфигурацию Firebase');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Инициализируем Analytics только на клиентской стороне
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics }; 