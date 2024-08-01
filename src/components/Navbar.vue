<!-- navbar.vue -->
<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';
import Store from './Store.vue'
import eventBus from '../events/eventBus.js'


const router = useRouter();
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
const userId = Number(localStorage.getItem('user_id'));
const apiUrlDDBB = import.meta.env.VITE_API_URL_DDBB;
const items = ref([]);
const visible = ref(false);
const loading = ref(false);
const totalOrders = ref()

const updateMenuItems = () => {
    items.value = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            to: '/',
            visible: !isAuthenticated.value
        },
        {
            label: 'Drinks',
            icon: 'pi pi-trophy',
            to: '/drinks'
        },
        {
            label: 'Login',
            icon: 'pi pi-user',
            to: '/login',
            visible: !isAuthenticated.value
        },
        {
            label: 'Order',
            icon: 'pi pi-cart-plus',
            command: () => { visible.value = true; },
            visible: isAuthenticated.value,
            totalOrderss: totalOrders.value
        },
        {
            label: '',
            icon: 'pi pi-sign-out',
            command: () => logout(),
            visible: isAuthenticated.value
        }
    ];
};
const axiosCocktails = async () => {
    loading.value = true;
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(`${apiUrlDDBB}/pending-orders/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        totalOrders.value = response.data.pendingOrders.length
    } catch (error) {
        console.error('Error fetching cocktails:', error);
        if (error.response.status === 401) {
            router.push('/login')
        }
    } finally {
        loading.value = false;

    }
};
onMounted(() => {
    axiosCocktails();
    eventBus.$on('order-updated', axiosCocktails); // Escuchar el evento
});

watchEffect(updateMenuItems);

const logout = () => {
    loading.value = true;
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    isAuthenticated.value = false;
    router.push('/login').then(() => {
        location.reload();
    });
};
</script>
<template>
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <ProgressSpinner class="w-12 h-12" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <div class="card">
        <Menubar :model="items"
            class="lg:flex lg:flex-row lg:justify-between lg:fixed lg:top-0 lg:z-[1000] lg:w-full lg:overflow-x-auto md:flex md:justify-between md:fixed md:top-0 md:z-[1000] md:w-full md:overflow-x-auto justify-between">
            <template #start>
                <img src="/logo_coctel.webp" alt="Logo" class="h-8" />
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <div v-if="item.to" class="flex justify-end">
                    <router-link v-if="item.visible !== false" :to="item.to" class="flex items-center"
                        v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </router-link>
                </div>
                <div v-else-if="item.command" @click="item.command"
                    class="lg:flex lg:justify-center lg:items-center lg:cursor-pointer sm:flex sm:justify-start sm:items-start sm:cursor-pointer flex justify-end items-center cursor-pointer p-4">
                    <template v-if="item.totalOrderss !== undefined">
                        <OverlayBadge :value="item.totalOrderss">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </OverlayBadge>
                    </template>
                    <template v-else>
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </template>
                </div>
            </template>
        </Menubar>
    </div>

    <Dialog v-model:visible="visible" header="Orders" :style="{ width: '55rem' }">
        <Store />
    </Dialog>
</template>
