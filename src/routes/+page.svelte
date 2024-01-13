<script>
	import { onMount } from 'svelte';

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
	 * @type {HTMLDivElement}
	 */
	let container;

	let map;

	onMount(async () => {
		const position = {
			lat: 44.00682504045187,
			lng: -77.14345292848745
		};

		const mapOptions = {
			center: position,
			zoom: 16,
			mapId: 'Map_ID'
		};

		// @ts-ignore
		map = new google.maps.Map(container, mapOptions);

		bannerMessage = await getBannerMessage();

		hoursOfOperation = await getHoursOfOperation();

		menu = await getMenu();
	});
</script>

<div
	class="h-screen"
	style="background-image: url('https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca')"
>
	<div class="bg-red-700 flex justify-between p-6">
		<button class="text-white" on:click={() => (menuOpen = !menuOpen)}>Menu</button>
		<input class="rounded-md" />
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
								<div />
								<button on:click={() => (menuOpen = !menuOpen)}>CLOSE</button>
							</div>
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
	<div class="h-2/5" bind:this={container} />
</div>
