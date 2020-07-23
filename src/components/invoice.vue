<template>
    <section class="m-navbar">
        <div class="row mb-4 container">
            <div class="col-12 col-sm-12 text-left">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" @click="saveInvoice">
                        {{texto}}
                    </button>
                    <button type="button" class="btn btn-secondary" :disabled="texto=='Guardar'" data-toggle="tooltip" data-placement="top" :title="texto=='Guardar'?'guarde primero la factura':'Previsualizar Pdf'" @click="openModalPreviewPdf">
                        Ver PDF
                    </button>
                    <button type="button" class="btn btn-secondary" :disabled="texto=='Guardar'" data-toggle="tooltip" data-placement="top" :title="texto=='Guardar'?'guarde primero la factura':'Previsualizar Pdf'" @click="print">
                        Imprimir
                    </button>
                </div>
            </div>
        </div>
        <ValidationObserver ref="observer">
            <div class="container container-invoice">
                <div class="row border-top p-4">
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                        <img src="../assets/Emik.jpeg" class="img-fluid" alt="" width="250" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-8 col-lg-5 col-xl-6">
                        <h4>{{user.name}}</h4>
                        <p>
                            <strong>{{user.typeId}}: {{user.nit}} </strong>
                            <br />
                            {{user.address}}
                            <br />
                            {{user.city}}
                            <br />
                            {{user.phone}}<br />
                            {{user.email}}
                        </p>
                    </div>
                    <div class="col-12 col-sm-12 col-md-11 col-lg-4 col-xl-3">
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-4 col-form-label font-weight-bold">FACTURA:</label>
                            <div class="col-sm-8">
                                <ValidationProvider v-slot="{errors}" rules="required|numeric|min_value:1" name="N° Factura">
                                    <input v-model="form.code" type="text" class="form-control" placeholder="N° Factura" maxlength="5" style="min-width: 80px;" /> 
                                    <span class="text-danger f-10">{{errors[0]}}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-md-3 col-form-label font-weight-bold">FECHA:</label>
                            <div class="col-sm-10 col-md-9">
                                <ValidationProvider v-slot="{errors}" rules="required" name="Fecha">
                                    <input v-model="form.date" type="date" class="form-control" style="width=170px" />                          
                                    <span class="text-danger f-10">{{errors[0]}}</span>
                                </ValidationProvider>                           
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-right">
                                <span class="font-weight-bold">SALDO DEUDOR</span>
                                <br />
                                {{format_number(form.subtotal)}}
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="mb-4" />
                <!-- cliente -->
                <div class="row">
                    <div class="col-12 col-sm-10 col-md-6 col-lg-5  text-left">
                        <h5>Cliente</h5>
                        <ValidationProvider v-slot="{errors}" rules="required" name="Cliente">
                            <select v-model="form.customerId" class="form-control" @change="selectCustomer">
                                <option v-for="(list, idx) in optionsCustomers" :key="idx" :value="list._id">{{list.name}}</option>
                            </select>
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                        <p class="pt-4 pl-3">
                            <span class="font-weight-bold">{{customer.name}}</span><br />
                            <span>{{customer.typeId}}: {{customer.nit}}</span><br />
                            {{customer.address}} - {{customer.city}}<br />
                            {{customer.phone}}<br />
                            {{customer.email}}
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel panel-default">
                            <!-- <div class="panel-heading">
                                <h3 class="panel-title">
                                    <strong>Resumen del pedido</strong>
                                </h3>
                            </div> -->
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-condensed">
                                        <thead class="table-primary">
                                            <tr>
                                                <th style="width: 65px;" />
                                                <th class="col-5 col-md-4 col-lg-3" style="min-width: 461px;">
                                                    <strong>Artículo</strong>
                                                </th>
                                                <th class="pr-0">
                                                    <strong>D</strong>
                                                </th>
                                                <th class="col-2 col-md-3 col-lg-3 text-center">
                                                    <strong>Precio</strong>
                                                </th>
                                                <th class="col-2 col-md-2 col-lg-3 text-center" style="width: 65px;">
                                                    <strong>Cant</strong>
                                                </th>
                                                <th class="col-3 col-md-3 col-lg-3 text-right" style="min-width: 119px;">
                                                    <strong>Total</strong>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- foreach ($order->lineItems as $line) or some such thing here -->
                                            <tr v-for="(item, idx) in products" :key="idx">
                                                <td>
                                                    <span class="mr-2" style="font-size: 1em; color: Dodgerblue;" @click="addProduc(idx)">
                                                        <i class="fas fa-plus-square" />
                                                    </span>
                                                    <span v-if="idx > 0" style="font-size: 1em; color: Tomato;" title="Tooltip on top" @click="removeProduc(idx)">
                                                        <i class="fas fa-window-close" />
                                                    </span>
                                                </td>
                                                <td>
                                                    <select v-model="item.productId" class="form-control  form-control-sm" @change="establecerNombre(item)">
                                                        <option v-for="(list, idx3) in opctionsProduct" :key="idx3" :value="list._id">{{list.nameShow}}</option>
                                                    </select>
                                                </td>
                                                <td class="pr-0 pl-0 m-0">
                                                    <v-checkbox v-model="item.discount" class="pt-0 m-0" />
                                                    <!-- <input v-model="item.discount" class="form-check-input" type="checkbox" /> -->
                                                </td>
                                                <td class="text-center">
                                                    <vue-numeric v-model="item.price" currency="$" separator="," class="form-control form-control-sm" style="width: 120px;" maxlenght="10" @input.native="recalculate" />
                                                </td>
                                                <td class="text-center" style="width: 60px;">
                                                    <ValidationProvider v-slot="{errors}" rules="required|numeric" name="cantidad">
                                                        <vue-numeric v-model="item.quantity" currency="" separator="," maxlength="4" class="form-control form-control-sm" style="width: 60px;" @input.native="recalculate" />
                                                        <span class="text-danger f-10">{{errors[0]}}</span>
                                                    </ValidationProvider>
                                                </td>
                                                <td class="text-right">
                                                    {{format_number(item.total)}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="thick-line" />
                                                <td class="thick-line" />
                                                <td class="thick-line" />
                                                <td class="thick-line" />
                                                <td class="thick-line text-center">
                                                    <strong>Subtotal</strong>
                                                </td>
                                                <td class="thick-line text-right">
                                                    {{format_number(form.subtotal)}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line text-center">
                                                    <strong>Impuestos</strong>
                                                </td>
                                                <td class="no-line text-right">
                                                    {{form.shipping}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line text-center">
                                                    <strong>Total</strong>
                                                </td>
                                                <td class="no-line text-right">
                                                    {{format_number(form.subtotal)}}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ValidationObserver>
        <ModalPreviewInvoice ref="modalPreviewInvoice" />
    </section>
</template>
<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
export default {
    components:{
        ModalPreviewInvoice : () => import('./ModalPreviewInvoice')
    },
    data(){
        return{
            id_factura: this.$route.params.id_factura,
            form:{
                code: null,
                date: null,
                customerId: null,
                subtotal: 0,
                shipping: 0,
                products:[]
            },
            customer:{
                _id: null,
                name: null,
                typeId: 'NIT',
                nit: null,
                address: null,
                phone: null,
                email: null,
            },
            products:[
                {
                    productId: null,
                    nameShow: null,
                    description: null,
                    price: 0,
                    quantity: 0,
                    total: 0,
                    discount: true
                }
            ],
            opctionsProduct:[],
            optionsCustomers:[],

        }
    },
    computed:{
        ...mapGetters({
            user: 'user/user'
        }),
        texto(){
            if(this.id_factura=== undefined || this.id_factura ===null){
                return 'Guardar'
            }else{
                return 'Editar'
            }
        }
    },
    watch:{
        '$route.params.id_factura': function(id){
            this.id_factura = id
            this.startPage()
        }

    },
    async mounted(){
        await this.startPage()
    },
    methods:{
        async startPage(){
            this.clearForm()
            await this.SelectListarProducts()
            await this.listarCustomers()
            await this.listUser()
            await this.listInvoice()
        },
        recalculate(){   
            let subtotal = 0         
            this.products.map(p =>{             
                p.total = p.price * p.quantity
                subtotal = subtotal+ p.total
            })
            this.form.subtotal = subtotal
        },
        establecerNombre(item){
            let producFind = this.opctionsProduct.find(p => p._id===item.productId)
            if(producFind){
                item.nameShow = producFind.nameShow
                item.price = producFind.unitPrice
            }
        },
        addProduc(idx){
            let hasEmpty = this.products.some(e => e.productId === null)
            if(hasEmpty){
                this.notification('Mensaje', 'Producto vacio', 'warning')
                return false
            }
            let newProduct = {
                productId: null,
                description: null,
                price: 0,
                quantity: 0,
                total: 0,
                discount: true
            }
            let pos = idx +1         
            this.products.splice(pos,0, newProduct)

        },
        removeProduc(idx){
            this.products.splice(idx,1)
        },
        async openModalPreviewPdf(){
            await this.saveMovem()
            let productos = this.form.products.map(e =>{    
                let producFind = this.opctionsProduct.find(p => p._id===e.productId)
                if(producFind){
                    e.nameShow = producFind.nameShow
                }
                return e
            })
            // this.$refs.modalPreviewInvoice.openModal(this.form, this.customer, productos, this.user)
            this.$refs.modalPreviewInvoice.showPDFExternal(this.form, this.customer, productos, this.user)   
        },
        async print(){
            await this.saveMovem()
            let productos = this.form.products.map(e =>{    
                let producFind = this.opctionsProduct.find(p => p._id===e.productId)
                if(producFind){
                    e.nameShow = producFind.nameShow
                }
                return e
            })
            this.$refs.modalPreviewInvoice.showPrint(this.form, this.customer, productos, this.user)   
        },
        async SelectListarProducts(){
            try {
                const {data} = await this.$axios.get('product').catch(e =>this.HandlingErrors(e))
                this.opctionsProduct = data.body                
            } catch (e){
                this.error_catch(e)
            }
        },
        async listarCustomers(){
            try {
                const {data} = await this.$axios.get('customer').catch(e =>this.HandlingErrors(e))
                this.optionsCustomers = data.body                
            } catch (e){
                this.error_catch(e)
            }
        },
        selectCustomer(){
            let customerFind = this.optionsCustomers.find(e => e._id === this.form.customerId)
            if(customerFind){
                this.customer = customerFind 
            }
        },
        async saveInvoice(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    this.notification('Mensaje', 'Campos necesarios', 'warning')
                    return false
                }
                let hasEmpty = this.products.some(e => e.productId === null)
                if(hasEmpty){
                    this.notification('Mensaje', 'Tiene productos vacios', 'warning')
                    return false
                }
                this.form.products = this.products
                if(this.id_factura !==null && this.id_factura !== '' && this.id_factura !== undefined){
                    const {data} = await this.$axios.put('invoice', this.form).catch(e =>this.HandlingErrors(e))
                    this.notification('Mensaje', 'Factura editada', 'success')
                    this.id_factura = data.body._id
                    this.listInvoice()
                }else{
                    const {data} = await this.$axios.post('invoice', this.form).catch(e =>this.HandlingErrors(e))
                    this.notification('Mensaje', 'Factura guardada', 'success')
                    this.$router.push({name:'invoice.edit', params:{id_factura: data.body._id}})
                    this.id_factura = data.body._id
                    this.listInvoice()
                }
                
            } catch (error){
                this.error_catch(error)
            }

        },
        async saveMovem(){
            if(this.id_factura !==null && this.id_factura !== '' && this.id_factura !== undefined){
                const {data} = await this.$axios.put('invoice', this.form).catch(e =>this.HandlingErrors(e))
                this.notification('Mensaje', 'Factura editada', 'success')
                this.id_factura = data.body._id
                this.listInvoice()
            }else{
                this.notification('Mensaje', 'Tiene cambios sin guardar', 'warning') 
            }
        },
        async listInvoice(){
            try {
                if(this.id_factura=== undefined || this.id_factura ===null){
                    const {data} = await this.$axios.get(`last/invoice`).catch(e =>this.HandlingErrors(e))
                    this.form.code = data.body
                    return false
                }
                const {data} = await this.$axios.get(`invoice/${this.id_factura}`).catch(e =>this.HandlingErrors(e))
                this.form = data.body
                this.form.date = moment(this.form.date).utc().format('YYYY-MM-DD');
                this.products = data.body.products
                this. selectCustomer()
            } catch (e){
                this.error_catch(e)
            }

        },
        async listUser(){
            this.$store.dispatch('user/getLoggedUser')
        },
        clearForm(){
            this.form={
                code: null,
                date: null,
                customerId: null,
                subtotal: 0,
                shipping: 0,
                products:[]
            }
            this.customer ={
                _id: null,
                name: null,
                typeId: 'NIT',
                nit: null,
                address: null,
                phone: null,
                email: null,
            }
            this.products=[
                {
                    productId: null,
                    nameShow: null,
                    description: null,
                    price: 0,
                    quantity: 0,
                    total: 0,
                    discount: true
                }
            ]
            this.opctionsProduct=[]
            this.optionsCustomers=[]
        }
    }
    
}
</script>
<style scoped>
.margin-pdf{
    width: 632px;;
}
.bg-personalice{
    /* background-color: '#ebece'; */
        background: rgb(229, 241, 237);
}
.container-invoice{
    border-left: #96327c solid 2px;
    border-right: #96327c solid 1px;
}
.m-navbar{
      margin-top: 50px;  
}
</style>