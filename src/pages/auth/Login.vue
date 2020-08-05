<template>
    <section class="m-navbar">
        <ValidationObserver ref="observer">
            <div class="form-signin">
                <img class="mb-4" src="../../assets/Emik.jpeg" alt="" width="200" height="72" />
                <h1 class="h3 mb-3 font-weight-normal">
                    Please sign in
                </h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <ValidationProvider v-slot="{errors}" rules="required|email" name="email">
                    <input v-model="form.email" type="email" class="form-control" placeholder="Email address" autofocus />
                    <span class="text-danger f-10">{{errors[0]}}</span>
                </ValidationProvider>
                <label for="inputPassword" class="sr-only">Password</label>
                <ValidationProvider v-slot="{errors}" rules="required" name="password">
                    <input v-model="form.pass" type="password" class="form-control" placeholder="Password" />
                    <span class="text-danger f-10">{{errors[0]}}</span>
                </ValidationProvider>
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" @click="login">
                    Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </div>
        </ValidationObserver>
    </section>
</template>
<script>
export default {
    data(){
        return{
            form:{
                email: null,
                pass: null
            }
        }
    },
    methods:{
        async login(){
            try {
                const isValid = await this.$refs.observer.validate()
                if (!isValid){
                    this.notification('Mensaje', 'Campos necesarios', 'warning')
                    return false
                }
                await this.$store.dispatch('auth/login', this.form)
                this.$router.push({name:'invoice.list'})

                // const {data} = await this.$axios.post('login', this.form).catch(e =>this.HandlingErrors(e))
                // if(data.token){
                //     localStorage.setItem('mytoken', data.token);
                // }
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
