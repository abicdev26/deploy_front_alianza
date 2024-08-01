<script setup>
import { ref } from 'vue';

const props = defineProps({
    cocktail: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['add-drink']);

const visible = ref(false);

const selectedDrinks = ref([]);

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');


const showIngredients = () => {
    visible.value = true;
};


const hideDialog = () => {
    visible.value = false;
};

const addDrink = (cocktail) => {
    emit('add-drink', cocktail);
};
</script>

<template>
    <div>
        <Card class="w-80 hidden rounded">
            <template #header>
                <img class="rounded" :alt="cocktail.strDrink" :src="cocktail.strDrinkThumb" />
            </template>
            <template #title>
                <p class="text-center">
                    {{ cocktail.strDrink }}
                </p>
            </template>
            <template #subtitle>
                <div class="flex justify-between">
                    <span>{{ cocktail.strCategory }}</span>
                    <span>{{ cocktail.strAlcoholic }}</span>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button severity="secondary" label="Ingredients" icon="pi pi-list" outlined class="w-full"
                        @click="showIngredients" />
                    <Button v-if="isAuthenticated" label="Add Drink" icon="pi pi-plus" severity="info" outlined
                        class="w-full" @click="addDrink(cocktail)" />
                </div>
            </template>
        </Card>

        <Dialog v-model:visible="visible" modal header="Preparation" :style="{ width: '25rem' }">
            <div class="flex justify-between">
                <div class="text-surface-500 dark:text-surface-400 block mb-8">
                    <label>Ingredients</label>
                    <ul class="list-disc flex flex-col p-4 gap-2 opacity-50">
                        <li v-if="cocktail.strIngredient1">{{ cocktail.strIngredient1 }}</li>
                        <li v-if="cocktail.strIngredient2">{{ cocktail.strIngredient2 }}</li>
                        <li v-if="cocktail.strIngredient3">{{ cocktail.strIngredient3 }}</li>
                        <li v-if="cocktail.strIngredient4">{{ cocktail.strIngredient4 }}</li>
                        <li v-if="cocktail.strIngredient5">{{ cocktail.strIngredient5 }}</li>
                    </ul>
                </div>
                <div class="text-surface-500 dark:text-surface-400 block mb-8">
                    <label>Quantity</label>
                    <ul class="list-disc flex flex-col p-4 gap-2 opacity-50">
                        <li v-if="cocktail.strMeasure1">{{ cocktail.strMeasure1 }}</li>
                        <li v-if="cocktail.strMeasure2">{{ cocktail.strMeasure2 }}</li>
                        <li v-if="cocktail.strMeasure3">{{ cocktail.strMeasure3 }}</li>
                        <li v-if="cocktail.strMeasure4">{{ cocktail.strMeasure4 }}</li>
                        <li v-if="cocktail.strMeasure5">{{ cocktail.strMeasure5 }}</li>
                    </ul>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Close" severity="secondary" @click="hideDialog" />
            </div>
        </Dialog>

    </div>
</template>
