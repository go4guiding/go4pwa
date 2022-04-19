/// <reference types="typescript" />

// AUTHENTICATION
export declare type Role = 'member' | 'leader' | 'admin' | null;

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
} | null;

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
  createdAt: number;
  lastSignedInAt: number;
} | null;

export declare type AuthState = {
  token: string | null;
  isValid: boolean;
  isLoading: boolean;
  user: UserState;
  error: Error | null;
};
// END AUTHENTICATION
