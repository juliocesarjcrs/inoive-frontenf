<template>
    <div id="inspire" ref="modalCreatedProducts" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> <strong>Crear compra</strong> </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <v-app>
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
                                        <div class="col-7 col-sm-8 col-md-9">
                                            <div class="form-group">
                                                <v-autocomplete v-model="form.providerId" :items="optionsProviders" item-text="name" item-value="_id" label="Proveedor" persistent-hint single-line />
                                            </div>
                                        </div>
                                        <div class="pt-7 col-5 col-sm-4 col-md-3">
                                            <v-chip class="ma-2" color="cyan" label text-color="white">
                                                Total: {{format_number(total)}}
                                            </v-chip>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="row container">
                                <div class="col">                                  
                                    <div class="text-center">
                                        <v-btn rounded color="primary" dark @click="addCapital">
                                            Agregar capital
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
    
                            <div v-for="(persona, idx) in quienPaga" :key="idx" class="row container pb-0 pt-0 mb-0 pt-0">
                                <div class="col-1 col-md-1 col-lg-1 mt-4 pb-0 pt-0">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{on,attrs}">
                                            <v-icon small color="red" v-bind="attrs" v-on="on" @click="removePago(idx)"> 
                                                mdi-delete 
                                            </v-icon>
                                        </template>
                                        <span>Eliminar</span>
                                    </v-tooltip>
                                </div>
                                <div class="col-6 col-md-6 col-lg-6 pb-0 pt-0">
                                    <v-select v-model="persona.name" :items="selectPago" item-text="name" item-value="name" label="Inversionista" />
                                </div>
                                <div class="col-5 col-md-5 col-lg-5 pb-0 pt-0">
                                    <label class="f-11 mb-0 text-muted">Precio</label>
                                    <vue-numeric v-model="persona.valor" currency="$" separator="," class="form-control-2" maxlength="15" @input.native="calcularTotal" />
                                    <!-- <v-text-field v-model="persona.valor" label="Valor" /> -->
                                </div>
                            </div>

                            <div class="row container pt-0 pb-0">
                                <div class="col-3 col-md-3 col-lg-3" />

                                <div class="col-4 col-md-4 col-lg-4">
                                    Total Capital:
                                </div>
                                <div class="col-5 col-md-5 col-lg-5">
                                    <span :class="[total===total_quien_paga ? 'text-success' : 'text-danger']">{{format_number(total_quien_paga)}}</span>
                                </div>
                            </div>
                        </ValidationObserver>
                    </v-app>
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
import { log } from 'util'
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
                price: 0,
                quienPaga:[]
            },
            modeEdit: false,
            optionsTipoCompra:[
                {id: 1, name: 'Compra'},
                {id: 2, name: 'Consumo interno'},
                {id: 3, name: 'Ajuste inventario'},
                {id: 4, name: 'otros'}
            ],
            quienPaga:[],
            selectPago:[
                {id:1, name:'Silvia Milena Botero Orozco'},
                {id:2, name:'Jairo Alberto Botero Cotes'},
                {id:3, name:'Gladys Lucía Orozco Casadiego'},
                {id:4, name:'Julio Cesar Rico Suarez'}
            ],
            total_quien_paga: 0
      
        }
    },
    computed:{
        ...mapGetters({
            optionsProducts: 'stock/products',
            optionsProviders: 'stock/providers'       
        }),
        total(){
            if(this.form.quantity !== null && this.form.price !== null){
                return this.form.quantity * this.form.price
            }else{
                return 0
            }
        },
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
                this.quienPaga = item.quienPaga         
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
                this.form.quienPaga = this.quienPaga
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
        addCapital(){
            this.quienPaga.push({name: null, valor:0})
        },
        removePago(idx){
            this.quienPaga.splice(idx,1)
        },
        calcularTotal(){
            this.total_quien_paga =  this.quienPaga.reduce((acu, value)=>{
                return acu +value.valor
            }, 0)
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
    .form-control-2 {
        display: block;
        width: 100%;
        padding: 0rem 0.75rem;
        margin: 0px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        /* color: #495057; */
        color: #343a40;
        
        background-color: #fff;
        background-clip: padding-box;
        border-bottom: 2px solid #0a0a0a;
        transition: border-color 0.15s
    }
</style>