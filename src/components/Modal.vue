
<template>
    <!-- Modal -->
    <div :id="modal" ref="myModal" class="modal fade" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div :class="`modal-dialog modal-dialog-centered ${tamano ? tamano:''}`" role="document">
            <div class="modal-content principal">
                <div class="modal-header">
                    <div class="w-100">
                        <div class="row">
                            <div class="col-sm-2 col-2 my-auto">
                                <div class="logo mx-auto">
                                    <img src="" alt="" class="logo-empresa" />
                                    <!-- <img src="/img/logo/logo_essi.png" alt="" class="logo-empresa"> -->
                                </div>
                            </div>
                            <div class="col-sm-8 col-8 text-center my-auto">
                                <p v-if="titulo" class="modal-title  text-center f-600 text-white">
                                    {{titulo}}
                                </p>
                            </div>
                            <div class="col-sm-2 col-2" />
                        </div>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const generar_aletorio = () => {
    return Math.floor(Math.random() * 101)
}
export default{
    name: 'ModalPrincipal',
    props: ['titulo', 'tamano'],
    data(){
        return {
            modal: `modal-${generar_aletorio()}`
        }
    },
    mounted(){
        // let el_modal = $(`#${this.modal}`);
        let el_modal = $(this.$refs.myModal)
        el_modal.on('shown.bs.modal', () =>{
            if(el_modal.find('input').length){
                el_modal.find('input')[0].focus()
            }
        })
    },
    methods:{
        toggle(){
        // $(`#${this.modal}`).modal('toggle');
            $(this.$refs.myModal).modal('toggle')
        }
    }
}
</script>


