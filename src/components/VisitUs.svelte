<script>
	export let hoursOfOperation = [{ day: '', hours: '' }];
</script>

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
