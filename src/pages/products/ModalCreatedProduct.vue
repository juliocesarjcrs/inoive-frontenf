<template>
    <div ref="modalCreatedProducts" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> <strong>Producto</strong>  <span class="f12">{{nameProduct}}</span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ValidationObserver ref="observer">
                        <div class="container text-left">
                            <form> 
                                <div class="row">
                                    <div class="col-12 col-sm-2">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Empaque</label>
                                            <select v-model="form.packing" class="form-control">
                                                <option v-for="(packing, idx) in optionspacking" :key="idx" :value="packing.name">{{packing.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-2">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Tipo</label>
                                            <select v-model="form.type" class="form-control">
                                                <option v-for="(tipo, idx) in optionsTipo" :key="idx" :value="tipo.name">{{tipo.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-2">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Color</label>
                                            <select v-model="form.color" class="form-control">
                                                <option v-for="(color, idx) in optionsColor" :key="idx" :value="color.name">{{color.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-2">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Talla</label>
                                            <select v-model="form.size" class="form-control">
                                                <option v-for="(size, idx) in optionsSize" :key="idx" :value="size.name">{{size.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{errors}" rules="max:200" name="Nombre">
                                                <label for="exampleFormControlSelect1">Nombre</label>
                                                <input v-model="form.name" ype="text" class="form-control" placeholder="Nombre del producto" maxlength="200" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Categoria</label>
                                            <select v-model="form.category" class="form-control">
                                                <option v-for="(category, idx) in optionsCategory" :key="idx" :value="category.name">{{category.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Sub categoria</label>
                                            <select v-model="form.subcategory" class="form-control">
                                                <option v-for="(category, idx2) in optionsSubcategory" :key="idx2" :value="category.name">{{category.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Valor unitario</label>
                                            <ValidationProvider v-slot="{errors}" rules="numeric" name="Valor unitario">
                                                <vue-numeric v-model="form.unitPrice" currency="$" separator="," class="form-control" maxlength="15" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-7 col-md-9">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Descripción</label>
                                            <ValidationProvider v-slot="{errors}" rules="max:200" name="Valor unitario">
                                                <textarea v-model="form.descripction" class="form-control" rows="2" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-5 col-md-3">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Stock</label>
                                            <ValidationProvider v-slot="{errors}" rules="numeric|min_value:1" name="Stock">
                                                <input v-model="form.stock" ype="text" class="form-control" placeholder="Inventario inicial" maxlength="5" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
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
                        <span @click="saveProduct">Save changes </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                _id: null,
                name: null,
                nameShow: null,
                category: 'Salud',
                subcategory: 'Guantes',
                unitPrice: 0,
                descripction: null,
                packing: null,
                color: null,
                type: null,
                size: null,
                stock:null
            },
            modeEdit: false,
            optionsCategory: [
                {id: 1, name: 'Salud'},
                {id: 2, name: 'Aseo'},
                {id: 3, name: 'Vestuario'},
                {id: 4, name: 'Otros'},
            ],
            optionsSubcategory:[
                {id: 1, name: 'Guantes'},
                {id: 2, name: 'Tapabocas'},
                {id: 3, name: 'Alcohol'},
                {id: 4, name: 'Caretas'},
            ],
            optionspacking:[
                {id: 1, name: 'Caja'},
                {id: 2, name: 'Bolsa'},
                {id: null, name: 'Ninguno'}
            ],
            optionsColor:[
                {id: 1, name: 'Negro'},
                {id: 2, name: 'Azul'},
                {id: 3, name: 'Lila'},
                {id: null, name: 'Ninguno'}
            ],
            optionsTipo:[
                {id: 1, name: 'Vinilo'},
                {id: 2, name: 'Nitrilo'},
                {id: 2, name: 'Latex'},
                {id: null, name: 'Ninguno'}
            ],
            optionsSize:[
                {id: 1, name: 'XL'},
                {id: 2, name: 'L'},
                {id: 3, name: 'M'},  
                {id: 4, name: 'S'},  
                {id: 5, name: 'XS'}, 
                {id: null, name: 'Ninguno'}

            ]
        }
    },
    computed:{
        nameProduct(){
            let name = `${this.form.subcategory}`
            // console.log('this.form.color', this.form.color);
            if(this.form.name !== '' && this.form.name !==null){
                name =  name.concat(' - '+this.form.name)
            }
            if(this.form.packing !== 'Ninguno' && this.form.packing !==null){
                name =  name.concat(' - '+this.form.packing)
            }
            if(this.form.type !== 'Ninguno' && this.form.type !==null){
                name =  name.concat(' - '+this.form.type)
            }
            if(this.form.color !== 'Ninguno' && this.form.color !==null){
                name =  name.concat(' - '+this.form.color)
            }
            if(this.form.size !== 'Ninguno' && this.form.size !==null){
                name =  name.concat(' - '+this.form.size)
            }
            if(this.form.descripction !== '' && this.form.descripction !==null){
                name =  name.concat(' - '+this.form.descripction)
            }
            return name
        } 
    },
    methods:{
        openModal(product){
            this.clean()
            if(product){
                this.modeEdit = true
                this.form._id = product._id
                this.form.name = product.name
                this.form.nameShow = product.nameShow
                this.form.category = product.category
                this.form.subcategory = product.subcategory
                this.form.unitPrice = product.unitPrice
                this.form.descripction = product.descripction
                this.form.packing = product.packing
                this.form.color = product.color
                this.form.type = product.type
                this.form.size = product.size
                this.form.stock = product.stock
            }
            $(this.$refs.modalCreatedProducts).modal('toggle')
        },
        async saveProduct(){
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
                    const {data} = await this.$axios.put('product', this.form).catch(e =>this.HandlingErrors(e))

                }else{
                    const {data} = await this.$axios.post('product', this.form).catch(e =>this.HandlingErrors(e))

                }
                this.notification('Mensaje', 'Producto guardado', 'success')
                this.$emit('update')
                $(this.$refs.modalCreatedProducts).modal('toggle')
            } catch (e){
                console.error('catch',e)
            }
            
        },
        clean(){
            this.form={
                _id: null,
                name: null,
                nameShow: null,
                category: 'Salud',
                subcategory: 'Guantes',
                unitPrice: 0,
                descripction: null,
                packing: null,
                color: null,
                type: null,
                size: null,
                stock: null
            },
            this.modeEdit= false
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