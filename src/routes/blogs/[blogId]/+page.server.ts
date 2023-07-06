import { error } from '@sveltejs/kit';
import { FireStore } from '$lib/Firebase/FireStore';
import type { Blog } from '$lib/components/types';
import type { PageServerLoad } from './$types';
import type { Timestamp } from 'firebase/firestore';

export const load = (async ({ params }: { params: { blogId: string } }):Promise<{data:Blog}> => {
	const data = await new FireStore().fetchOneBlogSSR(params.blogId);
	if (data?.exists()) {
		const temp:any = data.data()
		const time:Timestamp = temp.createdAt;
		return {
			data: {...temp,createdAt:time.toMillis()} as Blog
		};
	}
	throw error(404, 'Not found');
}) satisfies PageServerLoad ;

export const ssr = true;
