<template>
    <section class="m-navbar">
        <div class="row mr-4 mb-0">
            <div class="col-12 text-right pb-0">
                <button class="btn btn-primary" @click="addInvoice">
                    Agregar Factura
                    <span class="mr-2 ml-2" style="font-size: 1em;">
                        <i class="fas fa-plus-square" />
                    </span>
                </button>
            </div>
        </div>
        <v-app id="inspire">
            <v-card>
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
                </v-card-title>
                <v-data-table
                :search="search"
                :headers="myHeaders"
                :items="formListProduct"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="_id"
                show-expand
                class="elevation-1"
                dense
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="edit(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleted(item._id)">
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <!-- <ul v-for="(product, idx) in item.products" :key="idx">
                                <li>{{product.nameShow}}-{{product.price}}-{{product.quantity}}</li>
                            </ul> -->
                            <div v-for="(product, idx) in item.products" :key="idx" class="row">
                                <div class="col-8">
                                    {{product.nameShow}}
                                </div>
                                <div class="col-2">
                                    {{product.quantity}}                                 
                                </div>
                                <div class="col-2">
                                    {{format_number(product.price)}}                                      
                                </div>
                            </div>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-app>
        <ModalDeletedProduct ref="ModalDeletedProduct" @update="listarInvoices" />
    </section>
</template>
<script>
import moment from 'moment'
export default {
    components:{
        ModalDeletedProduct : () => import('./ModalDeletedProduct')
    },
    data(){
        return{
            listProducts: [],
            formListProduct:[],
            search: '',
            items_per_page : [20, 50, 100, 200],
            singleExpand: true,
            expanded: [],
            myHeaders: [
                {
                    text: '#',
                    align: 'start',
                    value: 'code',
                    itemsPerPage: 50
                    
                },
                { text: 'Fecha', value: 'date' },
                { text: 'Cliente', value: 'customer' },
                { text: 'Valor total', value: 'subtotal', align: 'end' },
                { text: 'Cant Productos', value: 'cant_products' },
                { text: 'Opciones', value: 'actions',sortable: false },
                { text: '', value: 'data-table-expand' },
            ],
        }
    },
    mounted(){
        this.listarInvoices()
    },
    methods:{
        addInvoice(){
            this.$router.push({name:'invoice.edit'})
        },
        async listarInvoices(){
            try {
                const {data} = await this.$axios.get('invoice').catch(e =>this.HandlingErrors(e))
                this.listProducts = data.body               
                this.listProducts.map(e =>{
                    e.date = moment(e.date).utc().format('MMMM Do YYYY');
                }) 
                let datatable = this.listProducts.map(e =>{
                    return { 
                        _id:e._id, 
                        code:e.code, 
                        subtotal: this.format_number(e.subtotal), 
                        date: e.date,
                        customer: e.customerId.name,
                        cant_products: e.products.length,
                        products: e.products
                    }
                })  
                this.formListProduct = datatable            
            } catch (e){
                this.error_catch(e)
            }
        },
        edit(product){
            this.$router.push({name:'invoice.edit', params:{id_factura: product._id}})
        },
        deleted(id){
            this.$refs.ModalDeletedProduct.openModal(id)
            
        }
    }
}
</script>
<style scoped>
.m-navbar{
      margin-top: 50px;  
}
</style>