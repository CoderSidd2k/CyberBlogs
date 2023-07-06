import type { Timestamp } from "firebase/firestore";

export type customBtn = {
	content: string;
	item:Item;
};

export type each = {
	item: Item;
	content: string;
	id: string;
	lang?:string
	file?:File
};

export enum Item {
	'para',
	'head',
	'img',
	'code',
	'title'
}

export type Blog = {
	uid:string,
	blogArr:each[],
	keywords:string[],
	user:User,
	coverImg:string;
	createdAt:Timestamp,
	title:string[],
	id?:string
}

export type User = {
	name:string;
	img:string;
	social:{
		fb?:string;
		instagram?:string;
		twitter?:string;
	};
	email?:string;
}