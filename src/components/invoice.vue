<template>
    <section class="">
        <div class="row mb-4">
            <div class="col-12 col-sm-12 text-left">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" @click="saveInvoice">
                        {{texto}}
                    </button>
                    <button type="button" class="btn btn-secondary" :disabled="texto=='Guardar'" data-toggle="tooltip" data-placement="top" :title="texto=='Guardar'?'guarde primero la factura':'Previsualizar Pdf'" @click="openModalPreviewPdf">
                        Ver PDF
                    </button>
                </div>
            </div>
        </div>
        <ValidationObserver ref="observer">
            <div class="container container-invoice">
                <div class="row border-top p-4">
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                        <img src="../assets/Emik.jpeg" alt="" width="250" />
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h4>{{user.name}}</h4>
                        <p>
                            <strong>{{user.typeId}}: </strong><span>{{user.nit}}</span>
                            <br />
                            {{user.address}}
                            <br />
                            {{user.city}}
                            <br />
                            {{user.phone}}<br />
                            {{user.email}}
                        </p>
                        <!-- <h4>Silvia Milena Botero Orozco</h4>
                        <p>
                            <strong>NIF:</strong><span>1019.040260-1</span>
                            <br />
                            Circinvaalr 36 A No 104-25 Puerto Varas
                            <br />
                            313 276 1187<br />
                            silvia.boteroderecho@gmail.com
                        </p> -->
                    </div>
                    <div class="col-12 col-sm-12 col-md-4 col-lg-3">
                        <!-- <p> -->
                        <ValidationProvider v-slot="{errors}" rules="required|numeric|min_value:1" name="N° Factura">
                            <!-- <strong>Factura:</strong> -->
                            <input v-model="form.code" type="text" class="form-control" placeholder="N° Factura" maxlength="10" style="width: 180px;" />                      
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                        <br />
                        <!-- <strong>Fecha:</strong> -->
                        <ValidationProvider v-slot="{errors}" rules="required" name="Fecha">
                            <input v-model="form.date" type="date" class="form-control" style="width=170px" />                          
                            <span class="text-danger f-10">{{errors[0]}}</span>
                        </ValidationProvider>
                        <br />
                        <strong>Saldo deudor</strong><br />
                        {{format_number(form.subtotal)}}
                        <!-- </p> -->
                    </div>
                </div>
                <hr class="mb-4" />
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
                            {{customer.name}}<br />
                            <strong>{{customer.typeId}}: </strong><span>{{customer.nit}}</span><br />
                            {{customer.address}}<br />
                            {{customer.city}}<br />
                            {{customer.phone}}<br />
                            {{customer.email}}
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">
                                    <strong>Resumen del pedido</strong>
                                </h3>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-condensed">
                                        <thead class="table-primary">
                                            <tr>
                                                <th style="width: 65px;" />
                                                <th><strong>Artículo</strong></th>
                                                <!-- <th><strong>Descripción</strong></th> -->
                                                <th class="text-center">
                                                    <strong>Precio</strong>
                                                </th>
                                                <th class="text-center" style="width: 65px;">
                                                    <strong>Cant</strong>
                                                </th>
                                                <th class="text-right" style="min-width: 119px;">
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
                                                    <select v-model="item.productId" class="form-control  form-control-sm">
                                                        <option v-for="(list, idx3) in opctionsProduct" :key="idx3" :value="list._id">{{list.nameShow}}</option>
                                                    </select>
                                                </td>
                                                <!-- <td>
                                                    <input v-model="item.description" type="text" class="form-control form-control-sm" />
                                                </td> -->
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
                                                <!-- <td class="thick-line" /> -->
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
                                                <!-- <td class="no-line" /> -->
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
                                                <!-- <td class="no-line" /> -->
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
                    description: null,
                    price: 0,
                    quantity: 0,
                    total: 0
                }
            ],
            opctionsProduct:[],
            optionsCustomers:[],
            user:{
                _id: null,
                name: null,
                typeId: 2,
                nit: null,
                address: null,
                city:null,
                phone: null,
                email: null,
            },

        }
    },
    computed:{
        texto(){
            if(this.id_factura=== undefined || this.id_factura ===null){
                return 'Guardar'
            }else{
                return 'Editar'
            }
        }
    },
    mounted(){
        this.SelectListarProducts()
        this.listarCustomers()
        this.listInvoice()
        this.listUser()
    },
    methods:{
        recalculate(){   
            let subtotal = 0         
            this.products.map(p =>{             
                p.total = p.price * p.quantity
                subtotal = subtotal+ p.total
            })
            this.form.subtotal = subtotal
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
                total: 0
            }
            let pos = idx +1         
            this.products.splice(pos,0, newProduct)

        },
        removeProduc(idx){
            this.products.splice(idx,1)
        },
        openModalPreviewPdf(){
            let productos = this.form.products.map(e =>{    
                let producFind = this.opctionsProduct.find(p => p._id===e.productId)
                if(producFind){
                    e.nameShow = producFind.nameShow
                }
                return e
            })
            this.$refs.modalPreviewInvoice.openModal(this.form, this.customer, productos, this.user)
        },
        async SelectListarProducts(){
            try {
                const {data} = await this.$axios.get('product')
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
                console.log('del catch', error);
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
            try {
                const {data} = await this.$axios.get('user/5f0948da92d5b73308946151').catch(e =>this.HandlingErrors(e))
                this.user = data.body                
            } catch (e){
                this.error_catch(e)
            }
        },
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
</style>