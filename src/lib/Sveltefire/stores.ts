import { writable } from 'svelte/store';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import type { Firestore, Query, CollectionReference, DocumentReference, DocumentData } from 'firebase/firestore';
import { onAuthStateChanged, type Auth } from 'firebase/auth';
import type { User } from 'firebase/auth';

/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|DocumentReference} ref document path or reference
 * @param  {any} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(firestore: Firestore, ref: string | DocumentReference, startWith?: T) {
	let unsubscribe: () => void;

	// Fallback for SSR
	if (!firestore || !globalThis.window) {
		console.warn('Firestore is not initialized or not in browser');
		const { subscribe } = writable(startWith);
		return {
			subscribe,
			ref: null,
			id: ''
		};
	}

	const docRef = typeof ref === 'string' ? doc(firestore, ref) : ref;

	const { subscribe } = writable<T | null | undefined>(startWith, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T));
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|Query|CollectionReference} ref collection path, reference, or query
 * @param  {[]} startWith optional default data
 * @returns a store with realtime updates on collection data
 */
export function collectionStore<T>(
	firestore: Firestore,
	ref: string | Query | CollectionReference,
	startWith: T[] | undefined = undefined
) {
	let unsubscribe: () => void;
	
	// Fallback for SSR
	if (!firestore || !globalThis.window) {
		console.warn('Firestore is not initialized or not in browser');
		const { subscribe } = writable(startWith);
		return {
			subscribe,
			ref: null
		};
	}

	const colRef = typeof ref === 'string' ? collection(firestore, ref) : ref;

	const { subscribe } = writable<T[] | undefined>(startWith, (set) => {
		unsubscribe = onSnapshot(colRef, (snapshot) => {
			const data = snapshot.docs.map((s) => {
				return { id: s.id, ref: s.ref, ...s.data() } as T;
			});
			set(data);
		});
		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: colRef
	};
}
/**
 * @param  {Auth} auth firebase auth instance
 * @returns a store with the current firebase user
 */
export function userStore(auth: Auth) {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized on not in browser');
		const { subscribe } = writable(undefined);
		return {
			subscribe
		};
	}

	const { subscribe } = writable<User | null | undefined>(auth?.currentUser ?? undefined, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

// SDK store for FirebaseApp comopnent
export const sdk = writable<{ auth: Auth; firestore: Firestore }>();
