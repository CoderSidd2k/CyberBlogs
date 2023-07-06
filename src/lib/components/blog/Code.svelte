<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';

	export let lang: string | undefined;
	export let content: string;
</script>

<div class=" pb-7 md:pb-0">
	<CodeBlock language={lang} code={content} />
</div>
