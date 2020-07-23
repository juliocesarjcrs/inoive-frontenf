<template>
    <div ref="modalCreatedProducts" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> <strong>Crear compra</strong> </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ValidationObserver ref="observer">
                        <div class="container text-left">
                            <form> 
                                <div class="row">
                                    <div class="col-12 col-sm-12">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{errors}" rules="required" name="producto">
                                                <v-autocomplete v-model="form.productId" :items="optionsProducts" item-text="nameShow" item-value="_id" label="Producto" persistent-hint single-line />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{errors}" rules="required|numeric|min_value:1" name="Cantidad">
                                                <v-text-field v-model="form.quantity" :counter="5" label="Cantidad" required maxlength="5" :disabled="modeEdit" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Precio</label>
                                            <ValidationProvider v-slot="{errors}" rules="required|numeric|min_value:1" name="precio">
                                                <vue-numeric v-model="form.price" currency="$" separator="," class="form-control" maxlength="15" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <div class="form-group">
                                            <v-select v-model="form.type" :items="optionsTipoCompra" item-text="name" item-value="name" label="Tipo de compra" required />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{errors}" rules="required|numeric|min_value:1" name="Código">
                                                <v-text-field v-model="form.code" :counter="5" label="Código" required />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-12">
                                        <div class="form-group">
                                            <v-autocomplete v-model="form.providerId" :items="optionsProviders" item-text="name" item-value="_id" label="Proveedor" persistent-hint single-line />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ValidationObserver>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        <span @click="saveStock">guardar </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            form:{
                _id: null,
                productId: null,
                quantity: null,
                code: null,
                providerId: null,
                type: 'Compra',
                price: 0
            },
            modeEdit: false,
            optionsTipoCompra:[
                {id: 1, name: 'Compra'},
                {id: 2, name: 'Consumo interno'},
                {id: 3, name: 'Ajuste inventario'},
                {id: 4, name: 'otros'}
            ]
      
        }
    },
    computed:{
        ...mapGetters({
            optionsProducts: 'stock/products',
            optionsProviders: 'stock/providers'       
        }),
    },
    methods:{
        openModal(item){
            this.clean()
            this.listSelectPorducts()
            this.listSelectProviders()
            if(item){
                this.modeEdit = true
                this.form._id = item._id
                this.form.productId = item.productId._id
                this.form.quantity = item.quantity
                this.form.code = item.code
                this.form.providerId = item.providerId===null ? null : item.providerId._id
                this.form.price = item.price
                this.form.type = item.type              
            }else{
                this.listLastCode()
            }
            $(this.$refs.modalCreatedProducts).modal('toggle')
        },
        async listLastCode(){
            try {
                const {data} = await this.$axios.get(`last/stock`).catch(e =>this.HandlingErrors(e))
                this.form.code = data.body
                
            } catch (e){
                this.error_catch(e)
            }

        },
        listSelectPorducts(){
            this.$store.dispatch('stock/getProducts')
        },
        listSelectProviders(){
            this.$store.dispatch('stock/getProviders')
        },
        async saveStock(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    this.notification('Mensaje', 'Campos necesarios', 'warning')
                    return false
                }
                this.form.nameShow = this.nameProduct
                if (this.form.nameShow === null || this.form.nameShow=== ''){
                    this.notification('Mensaje', 'Nombre es necesario', 'warning')
                    return false
                }
                if(this.modeEdit){
                    const {data} = await this.$axios.put('stock', this.form).catch(e =>this.HandlingErrors(e))

                }else{
                    const {data} = await this.$axios.post('stock', this.form).catch(e =>this.HandlingErrors(e))

                }
                this.notification('Mensaje', 'Producto guardado', 'success')
                this.$emit('update')
                $(this.$refs.modalCreatedProducts).modal('toggle')
            } catch (e){
                this.error_catch(e)
            }
            
        },
        clean(){
            this.form={
                _id: null,
                productId: null,
                quantity: null,
                code: null,
                providerId: null,
                type: 'Compra',
                price: 0
            },
            this.modeEdit= false
            this.$refs.observer.reset()
        }
    }
}
</script>
<style scoped>
.margin-pdf {
    width: 632px;
}
table {
    font-size: 11px;
}
</style>