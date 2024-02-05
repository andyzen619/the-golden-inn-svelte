<script>
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';

	import { getYearsSinceStartYear, getBannerMessage, getHoursOfOperation, getMenu } from '$lib';

	let numberOfYearsInOperation = getYearsSinceStartYear(1997);

	let bannerMessage = {
		message: '',
		title: '',
		visible: false
	};

	let hoursOfOperation = [
		{ day: 'Mon', hours: 'Closed' },
		{ day: 'Tue', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Wed', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Thurs', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Fri', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Sat', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Sun', hours: '11:30 a.m. – 09:00 p.m.' }
	];

	let menu = {};

	let menuOpen = false;

	/**
	 * @type {any[]}
	 */
	let menuSearchResults = [];

	let menuSearchQuery = '';

	/**
	 * @type {string | Fuse<string | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; }>}
	 */
	let fuse;

	onMount(async () => {
		bannerMessage = await getBannerMessage();

		hoursOfOperation = await getHoursOfOperation();

		const menuFromDb = await getMenu();

		menu = Object.entries(menuFromDb).reduce((acc, curr) => {
			const [key, value] = curr;

			return {
				...acc,
				[key]: {
					...value,
					visible: false
				}
			};
		}, {});

		const menuToSearch = Object.entries(menuFromDb).reduce((acc, curr) => {
			const [, value] = curr;

			if (!value) {
				return { ...acc };
			}

			const { list } = value;

			return [...acc, ...list];
		}, []);

		fuse = new Fuse(menuToSearch, {
			keys: ['name']
		});
	});

	function performSearch() {
		const result = fuse.search(menuSearchQuery);

		// @ts-ignore
		menuSearchResults = result.map(({ item }) => item);
	}
</script>

<div
	class="h-screen"
	style="background-image: url('https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca')"
>
	<div class="bg-red-700 flex justify-between p-6">
		<button class="text-white" on:click={() => (menuOpen = !menuOpen)}>Menu</button>
		<div>
			<input
				class="rounded-md"
				bind:value={menuSearchQuery}
				on:input={performSearch}
				placeholder="Type to search..."
			/>
			<div class="absolute right-5 top-14 max-h-80 w-80 p-4 bg-white z-50 overflow-auto">
				{#each menuSearchResults as item}
					<div class="flex justify-between">
						<div>
							{item.name}
						</div>
						<div>
							{item.price}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	{#if menuOpen}
		<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div
					class="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0"
				>
					<div
						class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
					>
						<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex">
							<div class="flex justify-between w-screen">
								<div class="font-bold text-lg">MENU</div>
								<button class="text-xl" on:click={() => (menuOpen = !menuOpen)}>X</button>
							</div>
						</div>
						<div>
							{#each Object.values(menu) as category}
								<div class="m-4 border-solid border-2 border-gray-300 rounded-md">
									<div class="flex justify-start">
										{#if category.visible}
											<button
												class="flex justify-center p-2 text-lg w-full font-black"
												on:click={() => (category.visible = !category.visible)}
											>
												{category.name}
											</button>
										{:else}
											<button
												class="flex justify-start p-2 text-lg w-full"
												on:click={() => (category.visible = !category.visible)}
												>{category.name}</button
											>
										{/if}
									</div>
									{#if category.visible}
										{#each category.list as item}
											<div class="p-6">
												<div class="flex justify-between font-medium">
													<div class="text-lg">{item.name}</div>
													<div class="font-bold text-lg text-green-500">{item.price}</div>
												</div>
												<div class="font-light">
													{item.description}
												</div>
												{#if item.image}
													<div class="flex justify-center py-4">
														<img src={item.image} alt="Menu item" width="300" height="400" />
													</div>
												{/if}
											</div>
										{/each}
									{/if}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div>
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
		<div class="flex flex-col justify-center text-white">
			<div class="flex justify-center">
				<div class="px-6 py-20 rounded-full text-3xl opacity-75 bg-red-600">
					<div class="flex justify-center opacity-100">GOLDEN INN</div>
					<div class="flex justify-center opacity-100">RESTAURANT</div>
				</div>
			</div>
			<div class="flex justify-center text-lg text-center">
				SERVING AUTHENTIC CANTONESE STYLE CHINESE FOOD FOR {numberOfYearsInOperation} YEARS
			</div>
			<button
				class="bg-gray-300/75 text-black mx-auto px-10 py-4"
				on:click={() => (menuOpen = !menuOpen)}>Menu</button
			>
		</div>
		<div class="flex flex-col w-screen justify-evenly text-white">
			<div class="flex justify-center text-5xl">VISIT US</div>
			<div class="flex justify-center text-xl text-center">
				155 Main Street West, Picton, Prince Edward, ON, Canada
			</div>
			<div class="flex justify-center text-xl">613-476-7056</div>
			<div class="flex justify-center">
				<a href="tel:6134767056">
					<div
						class="rounded-full p-4 shadow bg-red-700 opacity-75 hover:opacity-100 font-semibold hover:text-white"
					>
						CALL TO PLACE YOUR ORDER
					</div>
				</a>
			</div>
			<div id="/visit_us" class="flex justify-center text-xl">Hours of Operation</div>
			<div class="flex justify-evenly">
				<div>
					{#each hoursOfOperation as item}
						<div>{item.day}</div>
					{/each}
				</div>
				<div>
					{#each hoursOfOperation as item}
						<div>{item.hours}</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<iframe
		class="flex w-full h-2/5"
		title="map"
		src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCEjL7ZIpn9SUG8raac9BtH18ZONAD_3hc&q=155%20Picton%20Main%20St%20Picton%2C%20ON%20K0K%202T0&center=44.00682504045187,-77.14345292848745&zoom=19"
	/>
</div>
