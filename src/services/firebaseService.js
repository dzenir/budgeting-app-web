import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy
} from 'firebase/firestore';

export async function fetchTransactions(userId) {
  const ref = collection(db, 'users', userId, 'transactions');
  const q = query(ref, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addTransaction(userId, data) {
  const ref = collection(db, 'users', userId, 'transactions');

  const combinedCategory = data.mainCategory && data.subCategory
    ? `${data.mainCategory} - ${data.subCategory}`
    : data.mainCategory || data.subCategory || 'Uncategorized';

  const transactionWithCategory = {
    ...data,
    category: combinedCategory,
  };

  await addDoc(ref, transactionWithCategory);
}
