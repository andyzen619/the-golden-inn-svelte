<script>
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';

	import { getMenu } from '../lib';

	/**
	 * @type {(event: Event) => void}
	 */
	export let onMenuClick;

	/**
	 * @type {string | Fuse<string | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; }>}
	 */
	let fuse;

	/**
	 * @type {any[]}
	 */
	let menuSearchResults = [];

	/**
	 * Perform search operation based on the input value.
	 * @param {Event} event - The input event.
	 * @returns {void}
	 */
	function performSearch(event) {
		const inputElement = event.target;

		if (inputElement instanceof HTMLInputElement) {
			const inputValue = inputElement.value;

			const result = fuse.search(inputValue);

			if (Array.isArray(result)) {
				menuSearchResults = result.map(({ item }) => item);
			}
		}
	}

	onMount(async () => {
		const menuFromDb = await getMenu();

		const menuToSearch = Object.entries(menuFromDb).reduce((acc, curr) => {
			const [, value] = curr;

			if (value && Array.isArray(value.list)) {
				const { list = [] } = value;

				return [...acc, ...list];
			}

			return acc;
		}, new Array());

		fuse = new Fuse(menuToSearch, {
			keys: ['name']
		});
	});
</script>

<div class="bg-red-700 flex justify-between px-8 py-4">
	<button class="text-white text-2xl" on:click={onMenuClick}>Menu</button>
	<div>
		<input class="rounded-full p-2" on:input={performSearch} placeholder="Type to search..." />
		{#if menuSearchResults.length}
			<div class="absolute right-4 top-20 max-h-96 w-96 bg-white z-50 overflow-auto rounded-md p-2">
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
