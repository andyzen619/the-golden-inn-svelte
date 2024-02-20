<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Menu from '../components/Menu.svelte';

	import BannerMessage from '../components/BannerMessage.svelte';
	import Landing from '../components/Landing.svelte';
	import VisitUs from '../components/VisitUs.svelte';
	import Map from '../components/Map.svelte';

	let menuOpen = false;

	const BACKGROUND_IMAGE =
		'https://firebasestorage.googleapis.com/v0/b/the-golden-inn-restaurant.appspot.com/o/goldenInnBackground.png?alt=media&token=c031b198-7ddc-4881-94e9-b61866bc15ca';

	function onMenuClick() {
		menuOpen = !menuOpen;
	}

	function onMenuCloseClick() {
		menuOpen = !menuOpen;
	}
</script>

<div class="h-full" style="background-image: url('{BACKGROUND_IMAGE}')">
	<Navbar {onMenuClick} />

	<Menu {menuOpen} {onMenuCloseClick} />

	<div>
		<BannerMessage />

		<Landing {onMenuClick} />

		<VisitUs />
	</div>

	<Map />
</div>
