<template>
    <section>
        <div class="row mr-4 mb-3">
            <div class="col-12 text-right">
                <button class="btn btn-primary" @click="addInvoice">
                    Agregar Factura
                    <span class="mr-2 ml-2" style="font-size: 1em;">
                        <i class="fas fa-plus-square" />
                    </span>
                </button>
            </div>
        </div>
        <div class="table-responsive-sm">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">
                            #
                        </th>
                        <th scope="col">
                            Fecha
                        </th>
                        <th scope="col">
                            Cliente
                        </th>
                        <th scope="col">
                            Valor total
                        </th>
                        <th scope="col">
                            Cant Productos
                        </th>
                        <th scope="col">
                            opciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(invoice, idx) in listProducts" :key="idx">
                        <th scope="row">
                            {{invoice.code}}
                        </th>
                        <td>{{invoice.date}}</td>
                        <td>{{invoice.customerId.name}}</td>
                        <td>{{format_number(invoice.subtotal)}}</td>
                        <td>{{invoice.products.length}}</td>
                        <td>
                            <span class="mr-2" style="font-size: 1em; color: Dodgerblue;" @click="edit(invoice)">
                                <i class="fas fa-edit" />
                            </span>
                            <span class="mr-2" style="font-size: 1em; color: tomato;" @click="deleted(invoice._id)">
                                <i class="fas fa-window-close" />
                            </span>                           
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalDeletedProduct ref="ModalDeletedProduct" @update="listarProducts" />
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
            listProducts: []
        }
    },
    mounted(){
        this.listarProducts()
    },
    methods:{
        addInvoice(){
            this.$router.push({name:'invoice.edit'})
        },
        async listarProducts(){
            try {
                const {data} = await this.$axios.get('invoice').catch(e =>this.HandlingErrors(e))
                this.listProducts = data.body               
                this.listProducts.map(e =>{
                    e.date = moment(e.date).utc().format('MMMM Do YYYY');
                })               
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