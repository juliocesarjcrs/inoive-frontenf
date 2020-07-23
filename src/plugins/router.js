import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import EditInvoice from '../components/invoice.vue'
import Products from '../pages/products/Products.vue'
import Customers from '../pages/customers/customers.vue'
import ListInvoices from '../pages/invoices/invoices.vue'
import User from '../pages/users/users.vue'
import NotFound from '../pages/NotFound.vue'
import Login from '../pages/auth/Login.vue'
import Providers from '../pages/provider/providers.vue'
import Stocks from '../pages/stock/stock.vue'

// const Bar = { template: '<div>barrrrrrrrrrrrr</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/', redirect: { name: 'invoice.list' } },
    { path: '/login',name:'Login',  component: Login},
    { path: '/facturas/list',name:'invoice.list',  component: ListInvoices },
    { path: '/facturas/edit/:id_factura?',name:'invoice.edit',  component: EditInvoice },
    { path: '/products', component: Products },
    { path: '/customers', component: Customers },
    { path: '/providers', name:'providers', component: Providers },
    { path: '/user', name:'user', component: User },
    { path: '/stock', name:'stock', component: Stocks },
    { path: '*', name:'NotFound', component: NotFound }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
// const router = new VueRouter({
//     routes // short for `routes: routes`
// })
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
  
export default router;

