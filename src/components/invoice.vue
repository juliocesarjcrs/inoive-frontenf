<template>
    <section class="m-4">
        <h1>Incvoice </h1>
        <button class="btn btn-primary" @click="openModal">
            Ver PDF
        </button>
        <div class="">
            <div class="row">
                <div class="col-3">
                    <img src="../assets/empresa.jpeg" alt="" width="150" />
                </div>
                <div class="col-6">
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
                <div class="col-3">
                    <p>
                        <strong>Factura:</strong>{{n_factura}}<br />
                        <strong>Fecha:</strong><br />
                        <strong>Saldo deudor</strong><br />
                        {{total}}
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-left">
                    <h5>Cliente</h5>
                    <p>
                        T y B Solucuines S.A.S<br />
                        <strong>NIF:</strong><span>1019.040260-1</span><br />
                        Circinvaalr 36 A No 104-25 Puerto Varas<br />
                        313 276 1187<br />
                        silvia.boteroderecho@gmail.com
                    </p>
                </div>
            </div>
            <ValidationObserver ref="observer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">
                                    <strong>Order summary</strong>
                                </h3>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th />
                                                <th><strong>Artículo</strong></th>
                                                <th class="text-center">
                                                    <strong>Precio</strong>
                                                </th>
                                                <th class="text-center ">
                                                    <strong>Cant</strong>
                                                </th>
                                                <th class="text-right">
                                                    <strong>Totals</strong>
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
                                                <td>{{item.name}}</td>
                                                <td class="text-center">
                                                    <vue-numeric v-model="item.price" currency="$" separator="," style="width: 120px;" @input.native="recalculate" />
                                                </td>
                                                <td class="text-center" style="width: 60px;">
                                                    <ValidationProvider v-slot="{errors}" rules="required|numeric" name="cantidad">
                                                        <vue-numeric v-model="item.quantity" currency="" separator="," maxlength="4" style="width: 60px;" @input.native="recalculate" />
                                                        <span class="text-danger f-10">{{errors[0]}}</span>
                                                    </ValidationProvider>
                                                </td>
                                                <td class="text-right">
                                                    {{item.total}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="thick-line" />
                                                <td class="thick-line" />
                                                <td class="thick-line text-center">
                                                    <strong>Subtotal</strong>
                                                </td>
                                                <td class="thick-line text-right">
                                                    $670.99
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line text-center">
                                                    <strong>Shipping</strong>
                                                </td>
                                                <td class="no-line text-right">
                                                    $15
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="no-line" />
                                                <td class="no-line" />
                                                <td class="no-line text-center">
                                                    <strong>Total</strong>
                                                </td>
                                                <td class="no-line text-right">
                                                    $685.99
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
            n_factura: 12,
            total: 760000000,
            products:[
                {
                    name:'Caja de guantes de nitrilo color azul por 100 unidades talla S,m Y l',
                    price: 40000,
                    quantity: 0,
                    total: 76000000
                }
            ]
        }
    },
    methods:{
        recalculate(){            
            this.products.map(p =>{
                p.total = p.price * p.quantity
            })

        },
        addProduc(idx){
            let newProduct = {
                name:'Caja de guantes de nitrilo color azul por 100 unidades talla S,m Y l',
                price: 0,
                quantity: 0,
                total: 0 
            }
            let pos = idx +1
            console.log('pos', pos);
            
            this.products.splice(pos,0, newProduct)

        },
        removeProduc(idx){
            this.products.splice(idx,1)
        },
        openModal(){
            this.$refs.modalPreviewInvoice.openModal()
        }
    }
    
}
</script>
<style scoped>
.margin-pdf{
    width: 632px;;
}
</style>