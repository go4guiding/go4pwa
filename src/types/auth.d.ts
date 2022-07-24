/// <reference types="typescript" />

import { SerializedError } from '@reduxjs/toolkit';
import { Role } from 'common';

// AUTHENTICATION
export declare type FirebaseUser<T> = T & {
  createdAt: string;
  lastLoginAt: string;
};

export declare type UserClaims = {
  unitId: string | null;
  patrolId: string | null;
  role: Role;
};

export declare type SignUpTokenResult = {
  expiresAt: string;
  usesRemaining: number;
  unitId: string;
  patrolId?: string;
  role: string;
};

export declare type SignInParams = {
  username: string;
  password: string;
};

export declare type SignUpParams = {
  username: string;
  password: string;
  token: string;
};

// States
export declare type UserState = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  unitId?: string;
  patrolId?: string;
  role: Role;
  createdAt: string;
  lastSignedInAt: string;
};

export declare type AuthState = {
  token: string | null;
  user: UserState | null;
  isValid: boolean;
  isLoading: boolean;
  error: SerializedError | null;
};
// END AUTHENTICATION
