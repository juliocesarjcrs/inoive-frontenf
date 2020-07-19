<template>
    <section class="m-navbar">
        <div class="row mr-4 mb-3">
            <div class="col-12 text-right">
                <button class="btn btn-primary" @click="addProduc">
                    Editar perfil
                    <span class="mr-2 ml-2" style="font-size: 1em;">
                        <i class="fas fa-plus-square" />
                    </span>
                </button>
            </div>
        </div>
        <div class="row border-top p-4">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <img src="../../assets/Emik.jpeg" alt="" width="250" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                <h4>{{form.name}}</h4>
                <p>
                    <strong>{{form.typeId}}:</strong><span>{{form.nit}}</span>
                    <br />
                    {{form.address}}
                    <br />
                    {{form.phone}}<br />
                    {{form.email}}
                </p>
            </div>
        </div>

        <ModalUsuario ref="ModalUsuario" @update="listUser" />
    </section>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    components:{
        ModalUsuario : () => import('./ModalUsuario')
    },
    data(){
        return{
            // form:{
            //     _id: null,
            //     name: null,
            //     typeId: '',
            //     nit: null,
            //     address: null,
            //     city:null,
            //     phone: null,
            //     email: null,
            // },
            listProducts: []
        }
    },
    computed:{
        ...mapGetters({
            form: 'user/user'
        })
    },
    mounted(){
        this.$store.dispatch('user/getLoggedUser')
        // this.listUser()
    },
    methods:{
        addProduc(){
            this.$refs.ModalUsuario.openModal(this.form)
        },
        async listUser(){
            this.$store.dispatch('user/getLoggedUser')
            // try {
            //     const {data} = await this.$axios.get('user/5f0948da92d5b73308946151').catch(e =>this.HandlingErrors(e))
            //     this.form = data.body                
            // } catch (e){
            //     this.error_catch(e)
            // }
        },
        editProduct(product){
            this.$refs.ModalUsuario.openModal(product)
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