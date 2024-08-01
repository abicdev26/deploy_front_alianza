<script setup>
import { ref, onMounted } from 'vue';
import CardCocktail from '../components/CardCocktail.vue';
import { useToast } from "primevue/usetoast";
import $ from 'jquery';
import { useRouter } from 'vue-router';
import eventBus from '../events/eventBus.js'



const cocktails = ref([]);
const searchCocktails = ref('coffee');
const selectedCocktails = ref([]);
const loading = ref(false);
const toast = useToast();
const userId = Number(localStorage.getItem('user_id'));
const apiUrlDDBB = import.meta.env.VITE_API_URL_DDBB;
const apiUrlThecocktaildb = import.meta.env.VITE_API_URL_TheCocktailDB;
const router = useRouter();


const fetchCocktails = () => {
    loading.value = true;

    $.ajax({
        url: `${apiUrlThecocktaildb}/json/v1/1/search.php?s=${searchCocktails.value}`,
        type: 'GET',
        success: (response) => {
            cocktails.value = response.drinks;
            toast.add({ severity: 'success', summary: 'Success', detail: 'Loaded drinks list', life: 3000 });
        },
        error: (error) => {
            toast.add({ severity: 'warn', summary: 'Error', detail: 'Error fetching cocktails', life: 3000 });
            console.error('Error fetching cocktails:', error);
        },
        complete: () => {
            loading.value = false;
        }
    });
};

const search = () => {
    fetchCocktails();
};

onMounted(() => {
    fetchCocktails();
});

const addDrink = (cocktail) => {
    loading.value = true;

    const existingCocktail = selectedCocktails.value.find(item => item.strDrink === cocktail.strDrink);
    const token = localStorage.getItem('token')

    $.ajax({
        url: `${apiUrlDDBB}/pending-orders`,
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify({
            user_id: userId,
            nameDrink: cocktail.strDrink,
            cantidad: 1,
        }),
        success: (response) => {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Added drink to list', life: 3000 });
            eventBus.$emit('order-updated');
        },
        error: (error) => {
            console.error('Error adding drink:', error);
            toast.add({ severity: 'warn', summary: 'Error', detail: 'Error adding drink', life: 3000 });
            if (error.response.status === 401) {
                router.push('/login')
            }
        },
        complete: () => {
            loading.value = false;
        }
    });
};

</script>

<template>
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <ProgressSpinner class="w-12 h-12" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <div class="flex flex-col gap-5 p-24">
        <div class="flex flex-row justify-end items-start gap-2">
            <div class="flex flex-col items-center">
                <InputText v-tooltip.bottom="'Search Drink'" placeholder="Search Drinks" v-model="searchCocktails" />
                <label class="opacity-55">look for your favorite drink</label>
            </div>
            <Button label="Search" @click="search" /> <!-- Añadir el evento click -->
        </div>
        <div class="flex flex-wrap justify-center gap-5">
            <CardCocktail v-for="(cocktail, index) in cocktails" :key="index" :cocktail="cocktail"
                @add-drink="addDrink" />
        </div>
    </div>
    <Toast position="top-center" />

</template>
