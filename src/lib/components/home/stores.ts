import { writable } from "svelte/store";

export const searchStore = writable<string>("");
export const callStore = writable<()=>void | undefined>(undefined);