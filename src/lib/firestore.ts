import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { ReadinessResult, SellerIntake, StepProgress } from '@/types';

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role?: 'seller' | 'buyer';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User data interface combining profile and business data
export interface UserData extends UserProfile {
  readinessResult?: ReadinessResult;
  sellerIntake?: SellerIntake;
  completedTasks?: string[];
}

// Create or update user profile
export const createUserProfile = async (
  uid: string,
  email: string,
  displayName?: string,
  role?: 'seller' | 'buyer'
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      uid,
      email,
      displayName: displayName || '',
      role: role || 'seller',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserData | null> => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  }

  return null;
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Save readiness result
export const saveReadinessResult = async (
  uid: string,
  readinessResult: ReadinessResult
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    readinessResult,
    updatedAt: serverTimestamp(),
  });
};

// Get readiness result
export const getReadinessResult = async (
  uid: string
): Promise<ReadinessResult | null> => {
  const userProfile = await getUserProfile(uid);
  return userProfile?.readinessResult || null;
};

// Save seller intake data
export const saveSellerIntake = async (
  uid: string,
  sellerIntake: SellerIntake
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    sellerIntake,
    updatedAt: serverTimestamp(),
  });
};

// Get seller intake data
export const getSellerIntake = async (uid: string): Promise<SellerIntake | null> => {
  const userProfile = await getUserProfile(uid);
  return userProfile?.sellerIntake || null;
};

// Save completed tasks
export const saveCompletedTasks = async (
  uid: string,
  completedTasks: string[]
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    completedTasks,
    updatedAt: serverTimestamp(),
  });
};

// Get completed tasks
export const getCompletedTasks = async (uid: string): Promise<string[]> => {
  const userProfile = await getUserProfile(uid);
  return userProfile?.completedTasks || [];
};

// Save completed articles
export const saveCompletedArticles = async (
  uid: string,
  completedArticles: string[]
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    completedArticles,
    updatedAt: serverTimestamp(),
  });
};

// Get completed articles
export const getCompletedArticles = async (uid: string): Promise<string[]> => {
  const userProfile = await getUserProfile(uid);
  return (userProfile as any)?.completedArticles || [];
};

// Save step progress
export const saveStepProgress = async (
  uid: string,
  stepProgress: StepProgress
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    stepProgress,
    updatedAt: serverTimestamp(),
  });
};

// Get step progress
export const getStepProgress = async (uid: string): Promise<StepProgress | null> => {
  const userProfile = await getUserProfile(uid);
  return (userProfile as any)?.stepProgress || null;
};
