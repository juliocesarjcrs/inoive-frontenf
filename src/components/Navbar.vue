<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="#"> <img src="../assets/Emik.jpeg" alt="" width="100" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div v-if="estaActivo" id="navbarText" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Facturas</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown03">
                            <router-link :to="{ name: 'invoice.list'}" class="dropdown-item">
                                Lista 
                            </router-link>
                            <router-link :to="{ name: 'invoice.edit'}" class="dropdown-item">
                                Nueva 
                            </router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Productos</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown04">
                            <router-link to="/products" class="dropdown-item">
                                Productos
                            </router-link>
                            <router-link :to="{ name: 'stock'}" class="dropdown-item">
                                Compras 
                            </router-link>
                            <router-link :to="{ name: 'providers'}" class="dropdown-item">
                                Proveedores 
                            </router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link to="/customers" class="nav-link">
                            Clientes
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link :to="{ name: 'user'}" class="nav-link">
                            Perfil
                        </router-link>
                    </li> -->
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Usuario</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown04">
                            <router-link :to="{ name: 'user'}" class="dropdown-item">
                                Perfil
                            </router-link>
                            <div class="dropdown-item" @click="cerrarSesion">
                                Cerrar sesión 
                            </div>
                        </div>
                    </li> -->
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle pb-0" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="rounded-circle img-fluid" alt="imagen aleatoria" src="https://picsum.photos/70/70?random" width="40px" height="40px" />
                            {{usuarioDB.name}}</a>                              
                        <!-- <div class="row">
                            <div class="col p-0">
                                <img class="rounded-circle img-fluid" alt="imagen aleatoria" src="https://picsum.photos/70/70?random" width="50px" height="40px" />
                            </div>
                            <div class="col pb-0">
                            </div>
                        </div> -->
                        <!-- <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{usuarioDB.name}}</a> -->
                        <div class="dropdown-menu" aria-labelledby="dropdown05">
                            <router-link :to="{ name: 'user'}" class="dropdown-item">
                                Perfil
                            </router-link>
                            <div class="dropdown-item cr-pointer" @click="cerrarSesion">
                                Cerrar sesión 
                            </div>
                        </div>
                    </li>
                    <!-- <li class="nav-item dropdown">
                        <div class="row">
                            <div class="col p-0">
                                <img class="rounded-circle img-fluid" alt="imagen aleatoria" src="https://picsum.photos/70/70?random" width="50px" height="40px" />
                            </div>
                            <div class="col pb-0">
                                <a class="nav-link dropdown-toggle pb-0" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{usuarioDB.name}}</a>                              
                            </div>
                        </div>
                        <div class="dropdown-menu" aria-labelledby="dropdown05">
                            <router-link :to="{ name: 'user'}" class="dropdown-item">
                                Perfil
                            </router-link>
                            <div class="dropdown-item" @click="cerrarSesion">
                                Cerrar sesión 
                            </div>
                        </div>
                    </li> -->
                </ul>
            </div>
            <button v-else class="btn btn-outline-success my-2 my-sm-0" type="button" @click="$router.push({ name: 'login'})">
                Login
            </button>
        </nav>
        <router-view />  
    </section>
</template>
<script>
import {mapGetters} from 'vuex'
import { log } from 'util'

export default {
    data(){
        return{
            form:{
                email: null,
                pass: null
            }
        }
    },
    computed:{
        ...mapGetters({
            estaActivo: 'auth/estaActivo',     
            usuarioDB: 'auth/usuarioDB'     
        })
    },
    mounted(){
        const token = localStorage.getItem('token')
        console.log('estaActivo', this.estaActivo);
    },
    methods:{
        async cerrarSesion(){
            try {
                await this.$store.dispatch('auth/cerrarSesion')
                this.$router.push({name:'login'})
            } catch (e){
                this.error_catch(e)
            }
        }
    }
}
</script>