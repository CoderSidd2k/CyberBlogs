import { writable } from 'svelte/store';
import { Item, type each } from '../../types';


export const itemStore = writable<each[]>([
	{ id: crypto.randomUUID(), item: Item.title, content: 'Title' },
	{ id: crypto.randomUUID(), item: Item.para, content: 'Your paragraph' }
]);

export const divStore = writable<HTMLElement>()
export { each };

