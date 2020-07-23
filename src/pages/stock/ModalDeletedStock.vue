<template>
    <div ref="modaldeleted" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eliminar Compra</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <p>¿Esta seguro de eliminar esta compra?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-primary">
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
            id: null
        }
    },

    methods:{
        openModal(id){
            this.id = id
            $(this.$refs.modaldeleted).modal('toggle')
        },
        async deleteProduct(){
            try {
                const {data} = await this.$axios.delete(`stock/${this.id}`).catch(e =>this.HandlingErrors(e))
                this.notification('Mensaje', 'Compra eliminada', 'success')
                this.$emit('update')
                $(this.$refs.modaldeleted).modal('toggle')
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