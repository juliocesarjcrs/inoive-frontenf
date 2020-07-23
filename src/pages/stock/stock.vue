<template>
    <section class="m-navbar">
        <div class="row mr-4 mb-0">
            <div class="col-12 text-right pb-0">
                <button class="btn btn-primary" @click="addInvoice">
                    Agregar Compra
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
                :items="formList"
                item-key="_id"
                class="elevation-1"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="edit(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleted(item._id)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-app>
        <ModalDeletedStock ref="ModalDeletedProduct" @update="listar" />
        <ModalCreatedStock ref="ModalCreatedStock" @update="listar" />
    </section>
</template>
<script>
import moment from 'moment'
export default {
    components:{
        ModalDeletedStock : () => import('./ModalDeletedStock'),
        ModalCreatedStock : () => import('./ModalCreatedStock')
    },
    data(){
        return{
            list: [],
            formList:[],
            search: '',
            myHeaders: [
                { text: '#', align: 'start', value: 'code', itemsPerPage: 50 },
                { text: 'Fecha', value: 'date' },
                { text: 'type', value: 'type' },
                { text: 'Producto', value: 'product' },
                { text: 'Proveedor', value: 'provider' },
                { text: 'Costo producto', value: 'price', align: 'end' },
                { text: 'Cant', value: 'quantity' },
                { text: 'Opciones', value: 'actions',sortable: false }
            ],
        }
    },
    mounted(){
        this.listar()
    },
    methods:{
        addInvoice(){
            this.$refs.ModalCreatedStock.openModal()
        },
        async listar(){
            try {
                const {data} = await this.$axios.get('stock').catch(e =>this.HandlingErrors(e))
                this.list = data.body               
                let datatable = this.list.map(e =>{
                    return { 
                        _id:e._id, 
                        code:e.code, 
                        date: moment(e.date).utc().format('MMMM Do YYYY'),
                        price: this.format_number(e.price), 
                        type: e.type,
                        product: e.productId.nameShow,
                        quantity: e.quantity,
                        provider: e.providerId===null ? '' : e.providerId.name
                    }
                })  
                this.formList = datatable            
            } catch (e){
                this.error_catch(e)
            }
        },
        edit(item){
            let itemFind = this.list.find(e => e._id === item._id)
            if(itemFind){
                this.$refs.ModalCreatedStock.openModal(itemFind)
            }

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