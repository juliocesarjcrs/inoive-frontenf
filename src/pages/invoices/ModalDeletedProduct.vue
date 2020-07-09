<template>
    <div ref="modaldeletedProducts" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eliminar Cliente</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>¿Esta seguro de eliminar este cliente?</p>
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
            $(this.$refs.modaldeletedProducts).modal('toggle')
        },
        async deleteProduct(){
            try {
                const {data} = await this.$axios.delete(`customer/${this.id}`).catch(e =>this.HandlingErrors(e))
                this.notification('Mensaje', 'Producto eliminado', 'success')
                this.$emit('update')
                $(this.$refs.modaldeletedProducts).modal('toggle')
            } catch (e){
                console.error('catch',e)
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