import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function fetchTransactions(userId) {
  const ref = collection(db, 'users', userId, 'transactions');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addTransaction(userId, data) {
  const ref = collection(db, 'users', userId, 'transactions');
  await addDoc(ref, data);
}
