import Code from '../Code.svelte';
import Head from '../Head.svelte';
import Img from '../Img.svelte';
import Para from '../Para.svelte';
import { itemStore, type each } from './store';
import { Item } from '../../types';

export class Write {
	createPara = () => {
		const currentItem: each = {
			id: crypto.randomUUID(),
			item: Item.para,
			content: ''
		};
		const parent = document.createElement('div');
		new Para({
			target: parent,
			props: {
				id: currentItem.id
			},
			hydrate: true
		});
		itemStore.update((e) => {
			e.push(currentItem);
			return e;
		});
		return parent;
	};

	createHead = () => {
		const currentItem: each = {
			id: crypto.randomUUID(),
			item: Item.head,
			content: ''
		};
		const parent = document.createElement('div');
		new Head({
			target: parent,
			props: {
				id: currentItem.id
			},
			hydrate: true
		});
		itemStore.update((e) => {
			e.push(currentItem);
			return e;
		});
		return parent;
	};

	createImg = () => {
		const currentItem: each = {
			id: crypto.randomUUID(),
			item: Item.img,
			content: ''
		};
		const parent = document.createElement('div');
		new Img({
			target: parent,
			props: {
				id: currentItem.id
			},
			hydrate: true
		});
		itemStore.update((e) => {
			e.push(currentItem);
			return e;
		});
		return parent;
	};

	createCode = () => {
		const currentItem: each = {
			id: crypto.randomUUID(),
			item: Item.code,
			content: '',
			lang: ''
		};
		const parent = document.createElement('div');
		new Code({
			target: parent,
			props: {
				id: currentItem.id
			},
			hydrate: true
		});
		itemStore.update((e) => {
			e.push(currentItem);
			return e;
		});
		return parent;
	};
}
