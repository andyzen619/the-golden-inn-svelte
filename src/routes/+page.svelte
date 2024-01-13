<script>
	import { Loader } from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';

	import { yearsSinceStartYear } from '$lib';

	let numberOfYearsInOperation = yearsSinceStartYear(1997);

	const daysOfTheWeek = [
		{ day: 'Mon', hours: 'Closed' },
		{ day: 'Tue', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Wed', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Thurs', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Fri', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Sat', hours: '11:30 a.m. – 09:00 p.m.' },
		{ day: 'Sun', hours: '11:30 a.m. – 09:00 p.m.' }
	];

	onMount(async () => {
		const loader = new Loader({
			apiKey: 'AIzaSyCEjL7ZIpn9SUG8raac9BtH18ZONAD_3hc',
			version: 'weekly'
		});

		const position = {
			lat: 44.00682504045187,
			lng: -77.14345292848745
		};

		const mapOptions = {
			center: position,
			zoom: 16,
			mapId: 'Map_ID'
		};

		try {
			const { Map } = await loader.importLibrary('maps');
			const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

			const map = new Map(document.getElementById('map'), mapOptions);

			const marker = new AdvancedMarkerElement({
				map: map,
				position,
				title: 'Uluru'
			});
		} catch (error) {
			console.error(error);
		}
	});
</script>

<div
	class="h-screen"
	style="background-image: url('https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca')"
>
	<div class="bg-red-700 flex justify-between p-6">
		<button class="text-white">Menu</button>
		<input class="rounded-md" />
	</div>
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
		<button class="bg-gray-300/75 text-black mx-auto px-10 py-4">Menu</button>
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
				{#each daysOfTheWeek as item}
					<div>{item.day}</div>
				{/each}
			</div>
			<div>
				{#each daysOfTheWeek as item}
					<div>{item.hours}</div>
				{/each}
			</div>
		</div>
	</div>
	<div id="map" class="h-2/5" />
</div>
