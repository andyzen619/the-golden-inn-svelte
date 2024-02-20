<script>
	import { onMount } from 'svelte';

	import { getBannerMessage } from '../lib';

	let bannerMessage = {
		message: '',
		title: '',
		visible: false
	};

	onMount(async () => {
		bannerMessage = await getBannerMessage();
	});
</script>

{#if bannerMessage.visible}
	<div class="flex-col bg-yellow-50 from-slate-300 p-4 my-0.5 rounded-sm">
		<div class="flex justify-center text-lg font-semibold font-mono">
			{bannerMessage.title}
		</div>
		<div class="flex justify-center text-md font-light">
			{bannerMessage.message}
		</div>
	</div>
{/if}
