import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import { app } from './firebaseConf';
export class FireStorage {
	static storage = getStorage(app);

	uploadImageToStorage = async (file: File, id: string) => {
		try {
			const reference = ref(FireStorage.storage, id);
			const snapShot = await uploadBytes(reference, file);
			if (snapShot) {
				return await getDownloadURL(reference);
			} else {
				return null;
			}
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	deleteFolder =async (id:string) => {
		try {
			const reference = ref(FireStorage.storage,id);
			const list = await listAll(reference)
			const del = list.items.map(elem=>
				deleteObject(elem)
			)
			await Promise.all(del);
			return true
		} catch (error) {
			console.log(error);
			return false
		}
	}
}
