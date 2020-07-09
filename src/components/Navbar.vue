<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"> <img src="../assets/Emik.jpeg" alt="" width="100" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div id="navbarText" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <!-- <router-link to="/facturas" class="nav-link">
                            Facturas
                        </router-link> -->
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Facturas
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link :to="{ name: 'invoice.list'}" class="dropdown-item">
                                Lista 
                            </router-link>
                            <!-- <router-link :to="{ name: 'invoice.edit'}" class="dropdown-item">
                                Editar 
                            </router-link> -->
                            <!-- <a class="dropdown-item" href="#">Edtar</a> -->
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link to="/products" class="nav-link">
                            Products
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/customers" class="nav-link">
                            Clientes
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li> -->
                </ul>
                <!-- <span class="navbar-text">
                    Navbar text with an inline element
                </span> -->
            </div>
        </nav>
        <router-view />  
    </section>
</template>