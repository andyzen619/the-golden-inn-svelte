<script>
	import { yearsSinceStartYear } from '$lib';

	let mainBackgroundImageUrl = `https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca`;

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
</script>

<div class="h-screen w-screen bg-[url('{mainBackgroundImageUrl}')]">
	<!-- Landing Component -->
	<div class="flex flex-col justify-center text-white h-2/3">
		<div class="flex justify-center p-8">
			<div class="px-6 py-24 rounded-full text-4xl opacity-75 bg-red-600">
				<div class="flex justify-center text-white opacity-100">GOLDEN INN</div>
				<div class="flex justify-center pt-2 opacity-100">RESTAURANT</div>
			</div>
		</div>
		<div class="flex justify-center text-lg text-center p-4">
			SERVING AUTHENTIC CANTONESE STYLE CHINESE FOOD FOR {numberOfYearsInOperation} YEARS
		</div>
	</div>

	<!-- Visit US Component -->
	<div class="flex flex-col w-screen justify-evenly text-white">
		<div class="flex justify-center text-5xl">VISIT US</div>

		<div class="flex justify-center text-xl text-center p-4">
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

		<div class="flex justify-center text-lg">
			<div class="flex flex-col justify-center">DAY</div>
			<div class="w-12" />
			<div class="flex flex-col justify-center">HOUR</div>
		</div>
	</div>
</div>
