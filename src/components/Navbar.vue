<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="#"> <img src="../assets/Emik.jpeg" alt="" width="100" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div id="navbarText" class="collapse navbar-collapse">
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
                    <!-- <li class="nav-item">
                        <router-link to="/products" class="nav-link">
                            Products
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link to="/customers" class="nav-link">
                            Clientes
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'user'}" class="nav-link">
                            Perfil
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <router-view />  
    </section>
</template>