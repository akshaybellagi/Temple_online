// Firebase Connection and Write Test
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export const testFirebaseWrite = async () => {
  console.log('🔥 Testing Firebase Write Operation...');
  
  try {
    // Test 1: Write a test document
    console.log('📝 Attempting to write test document...');
    const testData = {
      message: 'Firebase connection test',
      timestamp: serverTimestamp(),
      testId: Math.random().toString(36).substr(2, 9)
    };
    
    const docRef = await addDoc(collection(db, 'test'), testData);
    console.log('✅ Test document written with ID:', docRef.id);
    
    // Test 2: Read back the data
    console.log('📖 Attempting to read test collection...');
    const querySnapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Found', querySnapshot.size, 'documents in test collection');
    
    querySnapshot.forEach((doc) => {
      console.log('📄 Document:', doc.id, '=>', doc.data());
    });
    
    return true;
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    return false;
  }
};

// Test hall creation specifically
export const testHallCreation = async () => {
  console.log('🏛️ Testing Hall Creation...');
  
  try {
    const hallData = {
      name: 'Test Hall',
      capacity: 100,
      price: 5000,
      description: 'Test hall for Firebase connection',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'halls'), hallData);
    console.log('✅ Hall created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Hall creation failed:', error);
    throw error;
  }
};