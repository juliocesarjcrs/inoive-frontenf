<template>
    <div ref="modalCreated" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crear Proveedor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ValidationObserver ref="observer">
                        <div class="container text-left">
                            <form> 
                                <div class="row">
                                    <div class="col-12 col-md-7 col-lg-5">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{errors}" rules="required" name="Nombre">
                                                <label for="exampleFormControlSelect1">Nombre</label>
                                                <input v-model="form.name" ype="text" class="form-control" placeholder="Nombre del proveedor" maxlength="300" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-5 col-lg-3">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Tipo Identificación</label>
                                            <select v-model="form.typeId" class="form-control">
                                                <option v-for="(tipo, idx) in optionstype" :key="idx" :value="tipo.name">{{tipo.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-7 col-lg-4">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">N° Identificación</label>
                                            <ValidationProvider v-slot="{errors}" rules="required" name="N° Identificación">
                                                <input v-model="form.nit" ype="text" class="form-control" placeholder="N° Identificación" maxlength="15" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-7 col-lg-5">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Dirección</label>
                                            <ValidationProvider v-slot="{errors}" rules="required" name="Dirección">
                                                <input v-model="form.address" ype="text" class="form-control" placeholder="Dirección" maxlength="120" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-5 col-lg-3">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Ciudad</label>
                                            <ValidationProvider v-slot="{errors}" rules="required" name="ciudad">
                                                <input v-model="form.city" ype="text" class="form-control" placeholder="Ciudad" maxlength="120" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-7 col-lg-4">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Teléfono</label>
                                            <ValidationProvider v-slot="{errors}" rules="required" name="Teléfono">
                                                <input v-model="form.phone" ype="text" class="form-control" placeholder="Teléfono" maxlength="15" />
                                                <span class="text-danger f-10">{{errors[0]}}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-md-7 col-lg-7">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Email</label>
                                            <ValidationProvider v-slot="{errors}" rules="email" name="Email">
                                                <input v-model="form.email" ype="text" class="form-control" placeholder="Email" maxlength="120" />
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
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-primary">
                        <span @click="save">Guardar </span>
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
                typeId: 2,
                nit: null,
                address: null,
                city:null,
                phone: null,
                email: null,
            },
            modeEdit: false,
            optionstype: [
                {id: 1, name: 'CC'},
                {id: 2, name: 'NIT'},
                {id: 3, name: 'PA'},
            ],
     
        }
    },
    methods:{
        openModal(item){
            this.clean()
            if(item){
                this.modeEdit = true
                this.form._id = item._id
                this.form.name = item.name
                this.form.typeId = item.typeId
                this.form.nit = item.nit
                this.form.address = item.address
                this.form.city = item.city
                this.form.phone = item.phone
                this.form.email = item.email          
            }
            $(this.$refs.modalCreated).modal('toggle')
        },
        async save(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    this.notification('Mensaje', 'Campos necesarios', 'warning')
                    return false
                }
                if(this.modeEdit){
                    const {data} = await this.$axios.put('provider', this.form).catch(e =>this.HandlingErrors(e))

                }else{
                    const {data} = await this.$axios.post('provider', this.form).catch(e =>this.HandlingErrors(e))

                }
                this.notification('Mensaje', 'Producto guardado', 'success')
                this.$emit('update')
                $(this.$refs.modalCreated).modal('toggle')
            } catch (e){
                console.error('catch',e)
            }
            
        },
        clean(){
            this.form={
                _id: null,
                name: null,
                typeId: 1,
                nit: null,
                address: null,
                city:null,
                phone: null,
                email: null,
            },
            this.modeEdit= false
            this.$refs.observer.reset()
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