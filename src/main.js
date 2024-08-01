import { createApp } from 'vue';
import App from './App.vue';
import "./style.css"
import "primeicons/primeicons.css";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Tooltip from 'primevue/tooltip';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';
import Badge from 'primevue/badge';
import OverlayBadge from 'primevue/overlaybadge';



import router from './router'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);
app.component('Card', Card);
app.component('Dialog', Dialog);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('Password', Password);
app.component('Checkbox', Checkbox);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Accordion', Accordion);
app.component('AccordionPanel', AccordionPanel);
app.component('AccordionHeader', AccordionHeader);
app.component('AccordionContent', AccordionContent);
app.component('Toast', Toast);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Badge', Badge);
app.component('OverlayBadge', OverlayBadge);
app.use(ToastService);

app.directive('tooltip', Tooltip);

// app.use(PrimeVue);
app.use(router)
app.mount('#app');
