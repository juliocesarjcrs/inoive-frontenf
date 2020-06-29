<template>
    <div ref="miModalRepuestos" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                                <div ref="invoice" class="margin-pdf">
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
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h5 class="panel-title">
                                                        <strong>
                                                            Resumen del pedido</strong>
                                                    </h5>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="table-responsive">
                                                        <table class="table table-condensed">
                                                            <thead>
                                                                <tr>
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
                                                                <tr v-for="(item, idx) in products" :key="idx">
                                                                    <td>{{item.name}}</td>
                                                                    <td class="text-center">
                                                                        {{item.price}}
                                                                    </td>
                                                                    <td class="text-center" style="width: 60px;">
                                                                        {{item.quantity}}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        Save changes
                    </button>
                    <button type="button" class="btn btn-primary" @click="downloadWithCSS">
                        PDF
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jsPDF  from 'jspdf'
// import html2pdf from 'html2pdf'
import html2canvas from "html2canvas"
export default {
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
        openModal(){
            console.log('openModal interno');
            this.formatMoneyProducts()    
            $(this.$refs.miModalRepuestos).modal('toggle')
        },
        formatMoneyProducts(){
            this.products.map(e =>{
                let final_price = '$' + new Intl.NumberFormat('de-DE').format(e.price)
                let final_total = '$' + new Intl.NumberFormat('de-DE').format(e.total)
                e.price = final_price
                e.total = final_total
            })
        },
        downloadWithCSS(){
            const doc = new jsPDF({
                // unit: 'mm',
                // format: [297,   210]
                format: 'letter'
            })
            // doc.internal.scaleFactor = 1.55;
            /** WITH CSS */
            var canvasElement = document.createElement('canvas');
            html2canvas(this.$refs.invoice, { 
                canvas: canvasElement,
                // dpi: 300, // Set to 300 DPI
                // scale: 1, // Adjusts your resolution
            }).then(function(canvas){
                const img = canvas.toDataURL("../assets/empresa.jpeg", 1);
                doc.addImage(img,'JPEG',20,20);
                // doc.addImage(img,'JPEG',20,20,150,150);
                doc.save("sample.pdf");
            });
        },
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