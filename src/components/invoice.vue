<template>
    <section class="m-4">
        <div class="row mb-2">
            <div class="col-12 col-sm-12 text-left">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary">
                        Guardar
                    </button>
                    <button type="button" class="btn btn-secondary">
                        Ver PDF
                    </button>
                    <button type="button" class="btn btn-secondary">
                        Right
                    </button>
                </div>
            </div>
        </div>
        <div class="">
            <div class="row">
                <div class="col-12 col-sm-3">
                    <img src="../assets/empresa.jpeg" alt="" width="150" />
                </div>
                <div class="col-12 col-sm-6">
                    <h4>Silvia Milena Botero Orozco</h4>
                    <p>
                        <strong>NIF:</strong><span>1019.040260-1</span>
                        <br />
                        Circinvaalr 36 A No 104-25 Puerto Varas
                        <br />
                        313 276 1187<br />
                        silvia.boteroderecho@gmail.com
                    </p>
                </div>
                <div class="col-12 col-sm-3">
                    <p>
                        <strong>Factura:</strong>
                        <input v-model="form.code" type="text" class="form-control" placeholder="N° Factura" style="width=170px" />
                        <br />
                        <strong>Fecha:</strong>
                        <input v-model="form.date" type="date" class="form-control" style="width=170px" />
                        <br />
                        <strong>Saldo deudor</strong><br />
                        {{form.subtotal}}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-10 col-md-6 col-lg-3  text-left">
                    <h5>Cliente</h5>
                    <select v-model="form.customerId" class="form-control" @change="selectCustomer">
                        <option v-for="(list, idx) in optionsCustomers" :key="idx" :value="list._id">{{list.name}}</option>
                    </select>
                    <p>
                        {{customer.name}}<br />
                        <strong>NIF:</strong><span>{{customer.nit}}</span><br />
                        {{customer.address}}<br />
                        {{customer.phone}}<br />
                        {{customer.email}}
                    </p>
                </div>
            </div>
            <ValidationObserver ref="observer">
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
                                        <thead>
                                            <tr>
                                                <th style="width: 65px;" />
                                                <th><strong>Artículo</strong></th>
                                                <th><strong>Descripción</strong></th>
                                                <th class="text-center">
                                                    <strong>Precio</strong>
                                                </th>
                                                <th class="text-center" style="width: 65px;">
                                                    <strong>Cant</strong>
                                                </th>
                                                <th class="text-right">
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
                                                    <select v-model="item.productId" class="form-control">
                                                        <option v-for="(list, idx3) in opctionsProduct" :key="idx3" :value="list._id">{{list.nameShow}}</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input v-model="item.description" type="text" class="form-control" />
                                                </td>
                                                <td class="text-center">
                                                    <vue-numeric v-model="item.price" currency="$" separator="," class="form-control" style="width: 120px;" @input.native="recalculate" />
                                                </td>
                                                <td class="text-center" style="width: 60px;">
                                                    <ValidationProvider v-slot="{errors}" rules="required|numeric" name="cantidad">
                                                        <vue-numeric v-model="item.quantity" currency="" separator="," maxlength="4" class="form-control" style="width: 60px;" @input.native="recalculate" />
                                                        <span class="text-danger f-10">{{errors[0]}}</span>
                                                    </ValidationProvider>
                                                </td>
                                                <td class="text-right">
                                                    {{form.subtotal}}
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
                                                    {{form.subtotal}}
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
                                                    {{form.subtotal}}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ValidationObserver>
        </div>
        <ModalPreviewInvoice ref="modalPreviewInvoice" />
    </section>
</template>
<script>
export default {
    components:{
        ModalPreviewInvoice : () => import('./ModalPreviewInvoice')
    },
    data(){
        return{
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
                typeId: 1,
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
            optionsCustomers:[]

        }
    },
    mounted(){
        this.SelectListarProducts()
        this.listarCustomers()
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
            let newProduct = {
                name:'Caja de guantes de nitrilo color azul por 100 unidades talla S,m Y l',
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
        openModal(){
            this.$refs.modalPreviewInvoice.openModal()
        },
        async SelectListarProducts(){
            try {
                const {data} = await this.$axios.get('product')
                this.opctionsProduct = data.body                
            } catch (e){
                console.error(e)
            }
        },
        async listarCustomers(){
            try {
                const {data} = await this.$axios.get('customer').catch(e =>this.HandlingErrors(e))
                this.optionsCustomers = data.body                
            } catch (e){
                console.error(e)
            }
        },
        selectCustomer(){
            let customerFind = this.optionsCustomers.find(e => e._id === this.form.customerId)
            if(customerFind){
                this.customer = customerFind 
            }
        }
    }
    
}
</script>
<style scoped>
.margin-pdf{
    width: 632px;;
}
</style>