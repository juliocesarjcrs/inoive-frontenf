<template>
    <section>
        <div class="row">
            <div class="col-12">
                <span class="mr-2" style="font-size: 1em; color: Dodgerblue;" @click="addProduc">
                    Agregar Cliente<i class="fas fa-plus-square" />
                </span>
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
                        <td>{{product.address}}</td>
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
                const {data} = await this.$axios.get('customer').catch(e =>this.HandlingErrors(e))
                this.listProducts = data.body                
            } catch (e){
                console.error(e)
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