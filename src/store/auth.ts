import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  ThunkDispatch
} from '@reduxjs/toolkit';

import {
  User,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut as signOutOfFirebase
  // sendEmailVerification,
  // updateProfile,
  // createUserWithEmailAndPassword
} from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

import {
  AuthState,
  SignInParams,
  FirebaseUser,
  UserClaims,
  UserState,
  SignUpParams,
  SignUpTokenResult
} from 'types/auth';
import { auth } from '../firebase';

const EMAIL_SUFFIX = '@go4guides.co.uk';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null
};

// Thunks
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (params: SignUpParams) => {
    const { username, password, token } = params;
    const emailAddress = `${username}${EMAIL_SUFFIX}`;
    console.log('signUp', { emailAddress, password, token });
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (params: SignInParams) => {
    const { username, password } = params;
    const emailAddress = `${username}${EMAIL_SUFFIX}`;

    return await signInWithEmailAndPassword(auth, emailAddress, password);
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => await signOutOfFirebase(auth)
);

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (user: User | null) => {
    if (!user) return null;

    const { claims } = await user.getIdTokenResult();
    const { unitId, patrolId, role } = claims as UserClaims;
    const { displayName, email, uid, emailVerified, createdAt, lastLoginAt } =
      user as FirebaseUser<User>;

    return {
      uid,
      email,
      emailVerified,
      displayName,
      unitId,
      patrolId,
      role,
      createdAt,
      lastSignedInAt: lastLoginAt
    };
  }
);

// Functions
export async function getSignUpTokenResult(
  token: string
): Promise<SignUpTokenResult> {
  const data = await new Promise<SignUpTokenResult>((resolve) =>
    onValue(
      ref(getDatabase(), `signUpTokens/${token}`),
      (snapshot) => resolve(snapshot.val()),
      { onlyOnce: true }
    )
  );

  if (
    !data ||
    parseInt(data.expiresAt) < Date.now().valueOf() ||
    data.usesRemaining < 1
  )
    return null;

  return data;
}

export function onAuthChanged(
  dispatch: ThunkDispatch<AuthState, undefined, AnyAction>
) {
  onAuthStateChanged(auth, async (user) => dispatch(verifyAuth(user)));
  onIdTokenChanged(auth, async (user) => dispatch(verifyAuth(user)));
}

// Store slice
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log('auth/signUp.fulfilled', action);
      // state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      console.log('auth/signUp.rejected', action);
      // state.error = action.payload;
      state.isLoading = false;
    });

    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log('auth/signIn.fulfilled', action);
      // state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      console.log('auth/signIn.rejected', action);
      // state.error = action.payload;
      state.isLoading = false;
    });

    // Sign Out
    builder.addCase(signOut.fulfilled, (state) => {
      console.log('auth/signOut.fulfilled');
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(signOut.rejected, (state, action) => {
      console.log('auth/signOut.rejected', action);
      // state.error = action.payload;
    });

    // Verify Auth
    builder.addCase(verifyAuth.fulfilled, (state, action) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload as UserState | null;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(verifyAuth.rejected, (state, action) => {
      console.log('auth/verifyAuth.rejected', action);
      // state.error = action.payload;
    });
  }
});

// export const {} = slice.actions;
export const reducer = slice.reducer;
