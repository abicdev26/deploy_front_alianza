<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToDrinks = () => {
    router.push('/drinks');
};
</script>
<template>
    <div class="relative flex justify-center items-center h-screen bg-gray-800">
        <div class="absolute inset-0">
            <img src="https://thekitchencommunity.org/wp-content/uploads/2021/11/Mixed-Drinks.jpg"
                alt="Cocktail Background" class="w-full h-full object-cover filter blur-sm">
        </div>
        <div
            class="relative z-10 p-8 bg-gray-900 bg-opacity-45 backdrop-blur-2xl rounded-lg max-w-2xl text-center flex flex-col gap-4">
            <p class="text-gray-200 font-bold">
                Welcome to our exclusive bar! Log in to explore our selection of drinks. Browse and search through our
                extensive menu of craft cocktails, fine liquors, and specialty coffees. Enjoy your experience in a cozy
                and sophisticated atmosphere. Cheers and welcome!
            </p>
            <Button label="Go To Drinks" icon="pi pi-arrow-right" iconPos="right" severity="help" raised
                @click="navigateToDrinks" />
        </div>
    </div>
</template>
