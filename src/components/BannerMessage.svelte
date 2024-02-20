<script>
	export let bannerMessage = {
		visible: false,
		title: '',
		message: ''
	};
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
