<template>
    <section class="m-navbar">
        <div class="row mr-4 mb-3">
            <div class="col-12 text-right">
                <button class="btn btn-primary" @click="addProduc">
                    Agregar Proveedor
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
                            Nombre
                        </th>
                        <th scope="col">
                            NIT
                        </th>
                        <th scope="col">
                            Dirección
                        </th>
                        <th scope="col">
                            Teléfono
                        </th>
                        <th scope="col">
                            Email
                        </th>
                        <th scope="col">
                            opciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, idx) in listProducts" :key="idx">
                        <th scope="row">
                            {{idx+1}}
                        </th>
                        <td>{{product.name}}</td>
                        <td>{{product.nit}}</td>
                        <td>{{product.address}} - {{product.city}}</td>
                        <td>{{product.phone}}</td>
                        <td>{{product.email}}</td>
                        <td>
                            <span class="mr-2" style="font-size: 1em; color: Dodgerblue;" @click="editProduct(product)">
                                <i class="fas fa-edit" />
                            </span>
                            <span class="mr-2" style="font-size: 1em; color: tomato;" @click="deleteProduct(product._id)">
                                <i class="fas fa-window-close" />
                            </span>                           
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalCreated ref="ModalCreated" @update="listarProducts" />
        <ModalDeletedProduct ref="ModalDeletedProduct" @update="listarProducts" />
    </section>
</template>
<script>
export default {
    components:{
        ModalCreated : () => import('./ModalCreated'),
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
        addProduc(){
            this.$refs.ModalCreated.openModal()
        },
        async listarProducts(){
            try {
                const {data} = await this.$axios.get('provider').catch(e =>this.HandlingErrors(e))
                this.listProducts = data.body                
            } catch (e){
                this.error_catch(e)
            }
        },
        editProduct(product){
            this.$refs.ModalCreated.openModal(product)
        },
        deleteProduct(id){
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