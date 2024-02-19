<script>
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';

	import Navbar from '../components/Navbar.svelte';
	import Menu from '../components/Menu.svelte';

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

	/**
	 * @type {string | Fuse<string | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; } | { list: { price: string; description: string; image: URL; name: string; }[]; name: any; }>}
	 */
	let fuse;

	const GOOGLE_MAP_URL =
		'https://www.google.com/maps/embed/v1/place?key=AIzaSyCEjL7ZIpn9SUG8raac9BtH18ZONAD_3hc&q=155%20Picton%20Main%20St%20Picton%2C%20ON%20K0K%202T0&center=44.00682504045187,-77.14345292848745&zoom=17';

	const BACKGROUND_IMAGE =
		'https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca';

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

	function onMenuClick() {
		menuOpen = !menuOpen;
	}

	function onMenuCloseClick() {
		menuOpen = !menuOpen;
	}

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

<div class="h-full" style="background-image: url('{BACKGROUND_IMAGE}')">
	<Navbar {onMenuClick} {performSearch} {menuSearchResults} />

	<Menu {menu} {menuOpen} {onMenuCloseClick} />

	<div>
		<!-- BANNER MESSAGE -->
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

		<!-- LANDING -->
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
			<button
				class="bg-gray-300/75 text-black mx-auto px-10 py-4"
				on:click={() => (menuOpen = !menuOpen)}>Menu</button
			>
		</div>

		<!-- VISIT US -->
		<div class="flex flex-col w-screen justify-evenly text-white p-4">
			<div class="flex justify-center text-5xl p-4">VISIT US</div>
			<div class="flex justify-center text-xl text-center p-4">
				155 Main Street West, Picton, Prince Edward, ON, Canada
			</div>
			<div class="flex justify-center text-xl p-4">613-476-7056</div>
			<div class="flex justify-center p-4">
				<a href="tel:6134767056">
					<div
						class="rounded-full p-4 shadow bg-red-700 opacity-75 hover:opacity-100 font-semibold hover:text-white"
					>
						CALL TO PLACE YOUR ORDER
					</div>
				</a>
			</div>

			<!-- HOURS OF OPERATION -->
			<div id="/visit_us" class="flex justify-center text-xl">Hours of Operation</div>
			<div class="flex justify-center">
				<div class="p-8 pt-1">
					{#each hoursOfOperation as item}
						<div>{item.day}</div>
					{/each}
				</div>
				<div class="p-8 pt-1">
					{#each hoursOfOperation as item}
						<div>{item.hours}</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- MAP -->
	<iframe class="flex w-full h-96" title="map" src={GOOGLE_MAP_URL} />
</div>
