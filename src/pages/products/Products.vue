<template>
    <section>
        <div class="row mr-4 mb-3">
            <div class="col-12 text-right">
                <button class="btn btn-primary" @click="addProduc">
                    Agregar Producto
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
                        <!-- <th scope="col">
                            Categoria
                        </th> -->
                        <th scope="col">
                            Subcategoria
                        </th>
                        <th scope="col">
                            Precio
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
                        <td>{{product.nameShow}}</td>
                        <!-- <td>{{product.category}}</td> -->
                        <td>{{product.subcategory}}</td>
                        <td>{{format_number(product.unitPrice)}}</td>
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
        <ModalCreatedProduct ref="ModalCreatedProduct" @update="listarProducts" />
        <ModalDeletedProduct ref="ModalDeletedProduct" @update="listarProducts" />
    </section>
</template>
<script>
export default {
    components:{
        ModalCreatedProduct : () => import('./ModalCreatedProduct'),
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
            this.$refs.ModalCreatedProduct.openModal()
        },
        async listarProducts(){
            try {
                const {data} = await this.$axios.get('product').catch(e =>this.HandlingErrors(e))
                this.listProducts = data.body                
            } catch (e){
                console.error(e)
            }
        },
        editProduct(product){
            this.$refs.ModalCreatedProduct.openModal(product)
        },
        deleteProduct(id){
            this.$refs.ModalDeletedProduct.openModal(id)
            
        }
    }
}
</script>