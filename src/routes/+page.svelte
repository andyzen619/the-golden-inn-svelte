<script>
	import {yearsSinceStartYear} from '$lib';

	let mainBackgroundImageUrl = `https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca`;
	
	let numberOfYearsInOperation = yearsSinceStartYear(1997);

	
</script>

<div class="h-screen w-screen bg-[url('{mainBackgroundImageUrl}')]">
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
</div>