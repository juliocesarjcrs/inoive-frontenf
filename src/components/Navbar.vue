<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar w/ text</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
            </button>
            <div id="navbarText" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link to="/facturas" class="nav-link">
                            Facturas
                        </router-link>
                        <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
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