<template>
    <div ref="modaldeletedProducts" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eliminar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <p v-if="inInvoice <=0">
                        ¿Esta seguro de eliminar este producto?
                    </p>
                    <p v-else>
                        No se puede elminar este producto.
                        Se encuentra en {{inInvoice}} facturas 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Cerrar
                    </button>
                    <button v-if="inInvoice <=0" type="button" class="btn btn-primary">
                        <span @click="deleteProduct">Eliminar</span>
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
            id: null,
            inInvoice: null
        }
    },

    methods:{
        openModal(item){
            this.id = item._id
            this.inInvoice = item.inInvoice
            $(this.$refs.modaldeletedProducts).modal('toggle')
        },
        async deleteProduct(){
            try {
                const {data} = await this.$axios.delete(`product/${this.id}`).catch(e =>this.HandlingErrors(e))
                this.notification('Mensaje', 'Producto eliminado', 'success')
                this.$emit('update')
                $(this.$refs.modaldeletedProducts).modal('toggle')
            } catch (e){
                this.error_catch(e)
            }
            
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