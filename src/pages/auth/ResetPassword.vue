<template>
    <section class="m-navbar">
        <ValidationObserver ref="observer">
            <div class="form-signin">
                <img class="mb-4" src="../../assets/Emik.jpeg" alt="" width="200" height="72" />
                <h1 class="h3 mb-3 font-weight-normal">
                    Recuperar contraseña
                </h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <ValidationProvider v-slot="{errors}" rules="required|email" name="email">
                    <input v-model="form.email" type="email" class="form-control" placeholder="Email address" autofocus />
                    <span class="text-danger f-10">{{errors[0]}}</span>
                </ValidationProvider>
                <button class="btn btn-lg btn-primary btn-block" @click="recuperar">
                    Recuperar
                </button>
            </div>
        </ValidationObserver>
    </section>
</template>
<script>
export default {
    data(){
        return{
            form:{
                email: null
            }
        }
    },
    methods:{
        async recuperar(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    return false
                }
                const {data} = await this.$axios.post('reset-password', this.form).catch(e =>this.HandlingErrors(e))
                this.notification('Mensaje', 'Se ha enviado un  correo de recuperación', 'success')
            } catch (e){
                this.error_catch(e)
            }
        }
    }
}
</script>
<style scoped>
.m-navbar{
      margin-top: 50px;  
}
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
