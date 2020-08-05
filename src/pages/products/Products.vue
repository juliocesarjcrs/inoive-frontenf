<template>
    <section class="m-navbar">
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
        <v-app id="inspire">
            <v-card>
                <v-data-table
                dense
                :headers="my2Headers"
                :items="listProducts"
                item-key="_id"
                class="elevation-1"
                :items-per-page="15"
                :footer-props="footerProps"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                show-expand
                @current-items="getFiltered"
                >
                    <template v-slot:body.prepend>
                        <tr class="bgred">
                            <td />
                            <td>
                                <v-text-field v-model="name" type="text" label="Marca/Nombre" />
                            </td>
                            <td>
                                <v-select v-model="type" :items="optionsTipo" clearable label="Tipo" />
                            </td>
                            <td>
                                <v-select v-model="color" :items="colores" clearable label="Color" />
                            </td>
                            <td>
                                <v-select v-model="size" :items="optionsSize" clearable label="Tamaño" />
                            </td>
                            <td />
                            <td>
                                <v-text-field v-model="cant_stock" type="number" label="Mayor a" />
                            </td>
                        </tr>
                    </template>
                    <template v-slot:item.color="{ item }">
                        <v-chip v-if="item.color !== null" :color="getColor(item.color)">
                            {{item.color}}
                        </v-chip>
                    </template>
                    <template v-slot:item.unitPrice="{ item }">
                        {{format_number(item.unitPrice)}}
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editProduct(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteProduct(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <thead class="elevation-1 blue-grey lighten-4">
                                        <tr>
                                            <th class="text-left">
                                                Fecha
                                            </th>
                                            <th class="text-left">
                                                Proveedor
                                            </th>
                                            <th class="text-center">
                                                Valor comprado
                                            </th>
                                            <th class="text-left">
                                                Cant
                                            </th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(stock, idx) in item.allstocks" :key="idx">
                                            <td>{{format_date(stock.date)}}</td>
                                            <td>{{stock.providerId===null ?'Sin definir':stock.providerId.name}}</td>
                                            <td class="text-center">
                                                {{format_number(stock.price)}}
                                            </td>
                                            <td>{{stock.quantity}}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <!-- <div class="row">
                                <div class="col-2">
                                    Fecha
                                </div>
                                <div class="col-5">
                                    Proveedor
                                </div>
                                <div class="col-2 text-right">
                                    Precio
                                </div>
                                <div class="col-1">
                                    Cantidad
                                </div>
                            </div>
                            <div v-for="(stock, idx) in item.allstocks" :key="idx" class="row">
                                <div class="col-2">
                                    {{format_date(stock.date)}}                                 
                                </div>
                                <div class="col-5">
                                    {{stock.providerId===null ?'Sin definir':stock.providerId.name}}
                                </div>
                                <div class="col-2 text-right">
                                    {{format_number(stock.price)}}                                      
                                </div>
                                <div class="col-1">
                                    {{stock.quantity}}                                 
                                </div>
                                <div class="col-1" />                               
                            </div> -->
                        </td>
                    </template>
                    <template slot="body.append">
                        <tr class="green--text bgred">
                            <th class="title">
                                Totals
                            </th>
                            <th />
                            <th />
                            <th />
                            <th />
                            <th />
                            <th class="title">
                                {{totalStock}}
                            </th>
                            <th />
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-app>
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
            footerProps: {'items-per-page-options': [5, 15, 30, 50, 100, -1]},
            listProducts: [],
            search: '',
            name: '',
            type: '',
            color: '',
            size:'',
            cant_stock:null,
            totalStock: 0,
            colores:['Azul', 'Lila', 'Negro'],
            optionsTipo:['Vinilo', 'Nitrilo','Latex'],
            optionsSize:['XL','L','M',  'S', 'XS'],
            // expandir table
            singleExpand: true,
            expanded: [],
        }
    },
    computed: {
        my2Headers(){ 
            return [
                { text: 'Sub Categoria', value: 'subcategory' },
                { 
                    text: 'Nombre', 
                    align: 'left', 
                    value: 'name',
                    filter: f => { return (f + '').toLowerCase().includes(this[ 'name' ].toLowerCase()) }},
                { 
                    text: 'Tipo', 
                    value: 'type',
                    filter: f => { 
                        return this[ 'type' ] !==undefined ?  (f + '').toLowerCase().includes(this[ 'type' ].toLowerCase()) : true
                    }
                },
                { 
                    text: 'Color', 
                    value: 'color',
                    filter: f => { return this[ 'color' ] !==undefined ?  (f + '').toLowerCase().includes(this[ 'color' ].toLowerCase()) : true}
                },
                { 
                    text: 'Tamaño', 
                    value: 'size',
                    filter: f => {
                        // return this[ 'size' ] !==undefined ?  (f + '').toLowerCase().includes(this[ 'size' ].toLowerCase()) : true 
                        if(this[ 'size' ] ===undefined || this[ 'size' ] === ''){
                            return true
                        }
                        // console.log('1',(f + ''),'2', this[ 'size' ],  (f + '').includes(this[ 'size' ]));
                        const temp = this[ 'size' ].length === (f + '').length
                        return this[ 'size' ] !==undefined ?  this[ 'size' ].includes((f + '')) && temp : true 
                    }
                },
                { text: 'Valor venta', value: 'unitPrice' },
                { 
                    text: 'Stock', 
                    value: 'stock',
                    filter: f => { 
                        if(this.cant_stock===null){
                            return true
                        }else{
                            return f >= this.cant_stock
                        }
                        // return this[ 'color' ] !==undefined ?  (f + '').toLowerCase().includes(this[ 'color' ].toLowerCase()) : true
                    }
                },
                { text: 'Opciones', value: 'actions',sortable: false },
                { text: '', value: 'data-table-expand' }

            ]
        }
    },

    mounted(){
        this.listarProducts()
    },
    methods:{
        getFiltered(filtrado){
            let res = filtrado.reduce((acu, currentValue) =>{
                let temp = currentValue.stock === undefined ? 0 : currentValue.stock
                return acu + temp
            }, 0)
            this.totalStock = res
        },
        getColor(color){
            if (color === 'Azul') return '#BBDEFB'
            else if (color  === 'Lila') return '#E1BEE7'
            else if (color  === 'Negro') return '#757575'
            else return ''
        },
        addProduc(){
            this.$refs.ModalCreatedProduct.openModal()
        },
        async listarProducts(){
            try {
                const {data} = await this.$axios.get('product').catch(e =>this.HandlingErrors(e))
                this.listProducts = data.body                
            } catch (e){
                this.error_catch(e)
            }
        },
        editProduct(product){
            this.$refs.ModalCreatedProduct.openModal(product)
        },
        deleteProduct(item){
            this.$refs.ModalDeletedProduct.openModal(item)
            
        }
    }
}
</script>
<style scoped>
    .m-navbar{
        margin-top: 50px;  
    }
    @media (max-width: 600px) {
        .bgred {
            /* background-color: red; */
            display: block!important;
        }
    }
</style>