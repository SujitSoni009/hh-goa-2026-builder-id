import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "cultivated-day-ndw25",
  appId: "1:190271677491:web:4dac0deaacc0cbdb602f46",
  apiKey: "AIzaSyDka3dtIcU4LkoTF9rGiuCPKRhSDV2y_q0",
  authDomain: "cultivated-day-ndw25.firebaseapp.com",
  storageBucket: "cultivated-day-ndw25.firebasestorage.app",
  messagingSenderId: "190271677491",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-hhgoa2026idgener-6af5ba8a-1c95-4c7a-b28c-2cec11c37d49");

export type BuilderIdRecord = {
  uniqueId: string;
  fullName: string;
  handle: string;
  bio: string;
  location: string;
  photoBase64: string;
  status: 'VERIFIED' | 'REVOKED';
  createdAt: any;
};

export const saveBuilderId = async (data: Omit<BuilderIdRecord, 'createdAt' | 'status'>) => {
  const record: BuilderIdRecord = {
    ...data,
    status: 'VERIFIED',
    createdAt: serverTimestamp(),
  };
  // Using setDoc to use the uniqueId as the document ID
  await setDoc(doc(db, 'builder_ids', data.uniqueId), record);
};

export const getBuilderId = async (uniqueId: string): Promise<BuilderIdRecord | null> => {
  const docRef = doc(db, 'builder_ids', uniqueId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as BuilderIdRecord;
  }
  return null;
};
