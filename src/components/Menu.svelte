<script>
	export let menuOpen = false;

	export let menu = {};

	/**
	 * @type {(event: Event) => void}
	 */
	export let onMenuCloseClick;
</script>

{#if menuOpen}
	<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div
				class="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0"
			>
				<div
					class="relative transform overflow-hidden rounded-lgtext-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-white rounded-md"
				>
					<div class=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex">
						<div class="flex justify-between w-screen">
							<div class="font-bold text-lg">MENU</div>
							<button class="text-xl" on:click={onMenuCloseClick}>X</button>
						</div>
					</div>
					<div>
						{#each Object.values(menu) as category}
							<div class="m-4 rounded-lg shadow-md bg-white border border-gray-300">
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
											class="flex justify-center p-4 text-lg w-full shadow-md"
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
											<div class="text-justify font-light">
												{item.description}
											</div>
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
