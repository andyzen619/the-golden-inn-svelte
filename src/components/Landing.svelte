<script>
	export let numberOfYearsInOperation = 0;

	/**
	 * @type {(event: Event) => void}
	 */
	export let onMenuClick;
</script>

<div class="flex flex-col justify-center text-white">
	<div class="flex justify-center p-4">
		<div class="px-6 py-20 rounded-full text-3xl opacity-75 bg-red-600">
			<div class="flex justify-center opacity-100">GOLDEN INN</div>
			<div class="flex justify-center opacity-100">RESTAURANT</div>
		</div>
	</div>
	<div class="flex justify-center text-lg text-center p-4">
		SERVING AUTHENTIC CANTONESE STYLE CHINESE FOOD FOR {numberOfYearsInOperation} YEARS
	</div>
	<button class="bg-gray-300/75 text-black mx-auto px-10 py-4" on:click={onMenuClick}>Menu</button>
</div>
