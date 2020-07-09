<template>
    <div ref="miModalRepuestos" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Vista previa</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                                <div ref="invoice" class="margin-pdf">
                                    <section id="imprimir" ref="invoice">
                                        <div class="">
                                            <section id="primero">
                                                <div class="row">
                                                    <div class="col-12 col-sm-3">
                                                        <img src="../assets/Emik.jpeg" alt="" width="172" />
                                                    </div>
                                                    <div class="col-12 col-sm-6">
                                                        <h4>Silvia Milena Botero Orozco</h4>
                                                        <p>
                                                            <strong>NIF:</strong><span>1019.040260-1</span>
                                                            <br />
                                                            Circunvalar 36 A No 104-25 Puerto Varas
                                                            <br />
                                                            313 276 1187<br />
                                                            silvia.boteroderecho@gmail.com
                                                        </p>
                                                    </div>
                                                    <div class="col-12 col-sm-3">
                                                        <p>
                                                            <strong>Factura:</strong>
                                                            {{form.code}}

                                                            <br />
                                                            <strong>Fecha:</strong>
                                                            {{form.date}}

                                                            <br />
                                                            <strong>Saldo deudor</strong><br />
                                                            {{format_number(form.subtotal)}}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-sm-12 col-md-12 col-lg-12  text-left">
                                                        <h5>Cliente</h5>
                                                        <p>
                                                            {{customer.name}}<br />
                                                            <strong>NIF:</strong><span>{{customer.nit}}</span><br />
                                                            {{customer.address}}<br />
                                                            {{customer.phone}}<br />
                                                            {{customer.email}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </section>
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
                                                                <table id="my-table" class="table table-condensed">
                                                                    <thead>
                                                                        <tr>
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
                                                                        <tr v-for="(item, idx) in form.products" :key="idx">
                                                                            <td>
                                                                                {{item.nameShow}}
                                                                            </td>
                                                                            <td>
                                                                                {{item.description}}
                                                                            </td>
                                                                            <td class="text-center">
                                                                                {{format_number(item.price)}}
                                                                            </td>
                                                                            <td class="text-center" style="width: 60px;">
                                                                                {{item.quantity}}
                                                                            </td>
                                                                            <td class="text-right">
                                                                                {{format_number(item.total)}}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
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
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="downloadWithCSS">
                        PDF estilo imagenes
                    </button>
                    <button type="button" class="btn btn-primary" @click="prueba">
                        PDF
                    </button> <button type="button" class="btn btn-primary" @click="imprimir">
                        imorimir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jsPDF  from 'jspdf'
import 'jspdf-autotable'
// import html2pdf from 'html2pdf'
import html2canvas from "html2canvas"
export default {
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
            opctionsProduct:[],
            optionsCustomers:[]
  
        }
    },
    methods:{
        openModal(form, customer, productos){
            let temp = form
            temp.products = productos
            this.form= temp
            this.customer = customer
            $(this.$refs.miModalRepuestos).modal('toggle')
        },
        imprimir(){
            var div = document.querySelector("#imprimir")
            // this.imprimirElemento(div)
            this.imprimirElemento2()
        },
        imprimirElemento(elemento){
            var ventana = window.open('', 'PRINT', 'height=400,width=600')
            ventana.document.write('<html><head><title>' + document.title + '</title>')
            ventana.document.write('</head><body >')
            ventana.document.write(elemento.innerHTML)
            ventana.document.write('</body></html>')
            console.log('paso aqui');
            // debugger
            ventana.document.close()
            ventana.focus()
            ventana.onload = function(){
                ventana.print()
                // ventana.close()
            };
            // ventana.print() //imprimimos la ventana
            // ventana.close()  //cerramos la ventana
            return true
        } ,
        imprimirElemento2(){
            // Get HTML to print from element
            const prtHtml = document.getElementById('imprimir').innerHTML
            // Get all stylesheets HTML
            let stylesHtml = ''
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]){
                stylesHtml += node.outerHTML
            }
            // Open the print window
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
            WinPrint.document.write(`<!DOCTYPE html>
                <html>
                <head>
                ${stylesHtml}
                </head>
                <body>
                ${prtHtml}
                </body>
                </html>`)
            WinPrint.document.close()
            WinPrint.focus()
            WinPrint.print()
            // WinPrint.close()
        },
        downloadWithCSS(){
            const doc = new jsPDF({
                // unit: 'mm',
                // format: [297,   210]
                format: 'letter'
            })
            // doc.internal.scaleFactor = 1.55;
            /** WITH CSS */

            // var canvasElement = document.createElement('canvas');
            var canvasElement = this.$refs.invoice;
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
        generatePDF(img){
            console.log('generatePDF');
            
            const doc = new jsPDF({
                // unit: 'mm',
                // format: [297,   210]
                format: 'letter'
            })
            // doc.addImage(img, 'JPEG', 150, 10, 40, 20);
            
            // doc.addImage(img,'jpg',10,15,30,20)
            // console.log('img',img);
            doc.autoTable({html: '#my-table',
                startY: 50,})
            let primero = document.getElementById('primero')
            doc.save('table4.pdf')
            doc.fromHTML(primero,40,15,{
    
            });
        },
        resolverImg(imagePath){
            var defer = this.q.defer();
            var img = new Image();
            img.src = imagePath;
            img.addEventListener('load', function(){
                defer.resolve(img);
            });
            return defer.promise;
        },
        prueba(){
            var company_logo = {
                src:'data:image/png;base64,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',
                w: 80,
                h: 50
            };
            var comapnyJSON={
                CompanyName:'ABCD TECHONOLOGIES',
                CompanyGSTIN:'37B76C238B7E1Z5',
                CompanyState:'KERALA (09)',
                CompanyPAN:'B76C238B7E',
                CompanyAddressLine1:'ABCDEFGD HOUSE,IX/642-D',
                CompanyAddressLine2:'ABCDEFGD P.O., NEDUMBASSERY',
                CompanyAddressLine3:'COCHIN',
                PIN: '683584',
                companyEmail:'xyz@gmail.com',
                companyPhno:'+918189457845',
            };
            var fontSizes={
                HeadTitleFontSize:18,
                Head2TitleFontSize:16,
                TitleFontSize:14,
                SubTitleFontSize:12,
                NormalFontSize:10,
                SmallFontSize:8
            };
            var lineSpacing={
                NormalSpacing:12,
            };
            var doc = new jsPDF('p', 'pt');
        
            var rightStartCol1=400;
            var rightStartCol2=480;


            var InitialstartX=40;
            var startX=40;
            var InitialstartY=50;
            var startY=0;

            var lineHeights=12;

            // var res = doc.autoTableHtmlToJson(document.getElementById('my-table'));
            // res = doc.autoTableHtmlToJson(document.getElementById("tblInvoiceItemsList"));
            
            doc.setFontSize(fontSizes.SubTitleFontSize);
            doc.setFont('times');
            doc.setFontType('bold');
            
            
            //pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
            doc.addImage(company_logo.src, 'PNG', startX,startY+=50, company_logo.w,company_logo.h);

            // doc.text(comapnyJSON.CompanyName, {align: "left"}, startX, startY+=15+company_logo.h);
            doc.setFontSize(fontSizes.NormalFontSize);
            doc.text("GSTIN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            doc.setFontType('normal');
            console.log('va biennnn');
            // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
            doc.text(comapnyJSON.CompanyGSTIN, {align: "left"}, 80, startY);
            
            doc.setFontType('bold');
            doc.text("STATE", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            doc.setFontType('normal');
            doc.text(comapnyJSON.CompanyState, {align: "left"}, 80, startY);

            doc.setFontType('bold');
            doc.text("PAN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            doc.setFontType('normal');
            doc.text(comapnyJSON.CompanyPAN, {align: "left"}, 80, startY);

            // doc.setFontType('bold');
            // doc.text("Address", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            // doc.setFontType('normal');
            // doc.text(comapnyJSON.CompanyAddressLine1, {align: "left"}, 80, startY);
            // doc.text(comapnyJSON.CompanyAddressLine2, {align: "left"}, 80, startY+=lineSpacing.NormalSpacing);
            // doc.text(comapnyJSON.CompanyAddressLine3, {align: "left"}, 80, startY+=lineSpacing.NormalSpacing);
            
            doc.setFontType('bold');
            doc.text("PIN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            doc.setFontType('normal');
            doc.text(comapnyJSON.PIN, {align: "left"}, 80, startY);
            
            doc.setFontType('bold');
            doc.text("EMAIL", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            doc.setFontType('normal');
            doc.text(comapnyJSON.companyEmail, {align: "left"}, 80, startY);

            doc.setFontType('bold');
            doc.text("Phone: ", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
            doc.setFontType('normal');
            doc.text(comapnyJSON.companyPhno, {align: "left"}, 80, startY);
            doc.save('table4.pdf')
        }
        // prueba(){
        //     var doc = new jsPDF()
        //     var totalPagesExp = '{total_pages_count_string}'

        //     doc.autoTable({
        //         html: '#my-table',
        //         // head: headRows(),
        //         // body: bodyRows(40),
        //         didDrawPage: function(data){
        //         // Header
        //             doc.setFontSize(20)
        //             doc.setTextColor(40)
        //             doc.setFontStyle('normal')
        //             var base64Img = 'data:image/jpeg;base64,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' 
        //             if (base64Img){
        //                 doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
        //             }
        //             doc.text('Report', data.settings.margin.left + 15, 22)
        //             let primero = document.getElementById('primero')
        //             doc.fromHTML(primero,40,15,{
            
        //             });

        //             // Footer
        //             var str = 'Page ' + doc.internal.getNumberOfPages()
        //             // Total page number plugin only available in jspdf v1.0+
        //             if (typeof doc.putTotalPages === 'function'){
        //                 str = str + ' of ' + totalPagesExp
        //             }
        //             doc.setFontSize(10)

        //             // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        //             var pageSize = doc.internal.pageSize
        //             var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        //             doc.text(str, data.settings.margin.left, pageHeight - 10)
        //         },
        //         margin: { top: 30 },
        //     })

        //     // Total page number plugin only available in jspdf v1.0+
        //     if (typeof doc.putTotalPages === 'function'){
        //         doc.putTotalPages(totalPagesExp)
        //     }

        //     doc.save('table4.pdf')
        // },
  
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