import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	updateDoc,
	where,
	writeBatch
} from 'firebase/firestore';
import { app } from './firebaseConf';
import type { Blog, User } from '$lib/components/types';

export class FireStore {
	static db = getFirestore(app);

	createUserProfile = async (uid: string,email:string,name:string | null,img:string | null) => {
		try {
			const dbRef = doc(FireStore.db, 'users', uid);
			await setDoc(dbRef, {
				name: name || "",
				img: img || '',
				email: email
			});
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	uploadABlog = async (blog: Blog,blogId:string) => {
		try {
			const dbRef = doc(FireStore.db, 'blogs',blogId);
			await setDoc(dbRef, blog);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	fetchOneBlogSSR = async (id: string) => {
		try {
			const dbRef = doc(FireStore.db, 'blogs', id);
			return getDoc(dbRef);
		} catch (error) {
			console.log(error);
		}
	};

	updateProfileAndAllBlogs = async (user: User, uid: string) => {
		try {
			const dbRef = collection(FireStore.db, 'blogs');
			const q = query(dbRef, where('uid', '==', uid));
			const snapShot = await getDocs(q);
			const batch = writeBatch(FireStore.db);
			const userRef = doc(FireStore.db,'users',uid);
			batch.update(userRef,user);
			snapShot.forEach((doc) => {
				const ref = doc.ref;
				batch.update(ref, {
					user: user
				});
			});
			await batch.commit();
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	updateCategory =async (items:string[]) => {
		try {
			const dbRef = doc(FireStore.db,"category","category");
			await updateDoc(dbRef,{
				categories:arrayUnion(...items)
			})
			return true
		} catch (error) {
			console.log(error);
			return false
		}
	}
}
