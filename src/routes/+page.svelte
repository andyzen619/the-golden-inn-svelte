<script>
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';

	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Menu from '../components/Menu.svelte';

	import { getYearsSinceStartYear, getBannerMessage, getHoursOfOperation, getMenu } from '$lib';
	import BannerMessage from '../components/BannerMessage.svelte';
	import Landing from '../components/Landing.svelte';
	import VisitUs from '../components/VisitUs.svelte';
	import Map from '../components/Map.svelte';

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
		<BannerMessage {bannerMessage} />

		<Landing {menuOpen} {numberOfYearsInOperation} />

		<VisitUs {hoursOfOperation} />
	</div>

	<Map {GOOGLE_MAP_URL} />
</div>
