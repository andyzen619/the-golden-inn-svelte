<script>
	/**
	 * @type {{ name: string, price: string }[]}
	 */
	export let menuSearchResults = [];

	/**
	 * @type {(event: Event) => void}
	 */
	export let performSearch;

	/**
	 * @type {(event: Event) => void}
	 */
	export let onMenuClick;
</script>

<div class="bg-red-700 flex justify-between px-8 py-4">
	<button class="text-white text-2xl" on:click={onMenuClick}>Menu</button>
	<div>
		<input class="rounded-md p-2" on:input={performSearch} placeholder="Type to search..." />
		{#if menuSearchResults.length}
			<div class="absolute right-5 top-20 max-h-96 w-96 bg-white z-50 overflow-auto rounded-md p-2">
				{#each menuSearchResults as item}
					<div class="flex justify-between p-4 mx-auto">
						<div>
							{item.name}
						</div>
						<div>
							{item.price}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
