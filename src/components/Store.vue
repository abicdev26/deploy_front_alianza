<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import eventBus from '../events/eventBus.js'



const selectedCocktails = ref([]);
const orders = ref([]);
const activeIndex = ref([]);
const toast = useToast();
const loading = ref(false);
const userId = Number(localStorage.getItem('user_id'));
const apiUrlDDBB = import.meta.env.VITE_API_URL_DDBB;
const router = useRouter();




const axiosCocktails = async () => {
    loading.value = true;
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(`${apiUrlDDBB}/pending-orders/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        selectedCocktails.value = response.data.pendingOrders;
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching cocktails:', error);
        if (error.response.status === 401) {
            router.push('/login')
        }
    } finally {
        loading.value = false;

    }
};

const axiosOrderDelivered = async () => {
    loading.value = true;
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(`${apiUrlDDBB}/orders-delivered/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        orders.value = response.data.sort((a, b) => b.id - a.id);
        console.log(orders.value);        // console.log(orders.value);
    } catch (error) {
        // console.error('Error fetching cocktails:', error);
        console.error('Error fetching cocktails:', error);
        if (error.response.status === 401) {
            router.push('/login')
        }
    } finally {
        loading.value = false;

    }
};

const deleteOrder = async (orderId) => {
    loading.value = true;
    const token = localStorage.getItem('token')


    try {
        await axios.delete(`${apiUrlDDBB}/pending-orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Eliminar la orden de la lista localmente
        selectedCocktails.value = selectedCocktails.value.filter(order => order.id !== orderId);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Your drink was removed from your order', life: 3000 });
        eventBus.$emit('order-updated');
    } catch (error) {
        console.error('Error deleting order:', error);
        toast.add({ severity: 'warn', summary: 'Error', detail: 'error deleting', life: 3000 });
        if (error.response.status === 401) {
            router.push('/login')
        }
    } finally {
        loading.value = false;

    }
};

const axiosAddOrdesDelivered = async () => {
    loading.value = true;
    const token = localStorage.getItem('token')


    // console.log(selectedCocktails.value);

    const transformedData = selectedCocktails.value.reduce((acc, item) => {
        let order = acc.find(o => o.id === item.user_id);
        if (!order) {
            order = { id: item.user_id, items: [] };
            acc.push(order);
        }
        order.items.push({ nameDrink: item.nameDrink, cantidad: item.cantidad });
        return acc;
    }, []);

    // console.log(transformedData);

    axios.post(`${apiUrlDDBB}/orders-delivered`, transformedData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            console.log('Pedidos entregados registrados:', response.data);
            axiosCocktails()
            axiosOrderDelivered()
            toast.add({ severity: 'success', summary: 'Success', detail: 'Your order was saved successfully', life: 3000 });

        })
        .catch(error => {
            console.error('Error al registrar los pedidos entregados:', error);
            toast.add({ severity: 'warn', summary: 'Error', detail: 'Error saving your order', life: 3000 });
            if (error.response.status === 401) {
                router.push('/login')
            }
            // Manejar el error, mostrar un mensaje al usuario, etc.
        }).finally(() => {
            loading.value = false;

        })
}

onMounted(() => {
    axiosCocktails();
    axiosOrderDelivered()
});

</script>

<template>
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <ProgressSpinner class="w-12 h-12" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <div>
        <label class="font-medium">Pending Orders</label>
        <br><br>
        <DataTable :value="selectedCocktails" showGridlines tableStyle="min-width: 15rem">
            <Column field="nameDrink" header="Cocktail"></Column>
            <Column field="cantidad" header="Quantity"></Column>
            <template #empty>
                <div class="p-4 text-center text-gray-500">
                    No items found.
                </div>
            </template>
            <Column header="Actions">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-trash" severity="danger"
                        @click="deleteOrder(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>

        <div class="flex justify-end gap-2 mt-4">
            <Button type="button" label="Add Order" icon="pi pi-plus" severity="secondary"
                @click="axiosAddOrdesDelivered" />
        </div>
        <br>
        <hr>
        <br>

        <div class="flex flex-col gap-4">
            <label class="font-medium">Orders Delivered</label>
            <div v-if="orders.length === 0" class="p-4 text-center text-gray-500">
                No orders available.
            </div>
            <Accordion v-else v-model:activeIndex="activeIndex">
                <AccordionPanel v-for="(order, index) in orders" :key="order.id">
                    <AccordionHeader>{{ 'Order ' + order.id }}</AccordionHeader>
                    <AccordionContent>
                        <div class="flex justify-between">
                            <label>{{ order.nameDrink }}</label>
                            <label>{{ order.cantidad }}</label>
                        </div>
                    </AccordionContent>
                    <br>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
    <Toast position="top-center" />
</template>
