import { FireStore } from './FireStore';
import { app } from './firebaseConf';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	signOut,
	signInWithPopup,
	type User,
	updateProfile
} from 'firebase/auth';
export class AuthFire {
	static auth = getAuth(app);

	signUpWithEmail = async (email: string, password: string) => {
		try {
			await setPersistence(AuthFire.auth, browserLocalPersistence);
			const res = await createUserWithEmailAndPassword(AuthFire.auth, email, password);
			await new FireStore().createUserProfile(res.user.uid,res.user.email || "",res.user.displayName,res.user.photoURL);
			return res.user;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	signInWithEmail = async (email: string, password: string) => {
		try {
			await setPersistence(AuthFire.auth, browserLocalPersistence);
			const userCredentials = await signInWithEmailAndPassword(AuthFire.auth, email, password);
			return userCredentials.user;
		} catch (error) {
			console.log(error);
		}
	};

	continueWithGoogle = async () => {
		try {
			await setPersistence(AuthFire.auth, browserLocalPersistence);
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(AuthFire.auth, provider);
			if (result) {
				// This is the signed-in user
				const user = result.user;
				const res = getAdditionalUserInfo(result);
				if (res?.isNewUser) {
					await new FireStore().createUserProfile(user.uid,user.email||"",user.displayName,user.photoURL);
				}
				return { user, newUser: res?.isNewUser };
			}
		} catch (error) {
			console.log(error);
		}
	};
	signOut = async () => {
		try {
			await signOut(AuthFire.auth);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	updateUserProfile = async (user: User, data: updateProfileType) => {
		try {
			await updateProfile(user, data);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
}

export type updateProfileType = {
	displayName?: string;
	photoURL?: string;
};
