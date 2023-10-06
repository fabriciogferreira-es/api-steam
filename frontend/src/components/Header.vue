<script></script>

<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom"
  >
    <div class="col-md-3 mb-2 mb-md-0 ms-3">
      <router-link
        class="d-inline-flex link-body-emphasis text-decoration-none"
        to="/"
      >
        <img src="src/assets/image/favicon-32x32.png" alt="Logo" />
      </router-link>
    </div>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li>
        <router-link class="nav-link px-2 link-secondary" to="/">
          Home
        </router-link>
      </li>
      <li>
        <router-link class="nav-link px-2 link-secondary" to="/Game">
          Game
        </router-link>
      </li>
      <li>
        <router-link class="nav-link px-2 link-secondary" to="/Tester">
          Comprar
        </router-link>
      </li>
      <li><a href="#" class="nav-link px-2">FAQs</a></li>
      <li><a href="#" class="nav-link px-2">Sobre</a></li>
    </ul>

    <div class="col-md-3 text-end">
      <button type="button" class="btn btn-outline-primary me-2">Login</button>
      <button type="button" class="btn btn-primary">Sign-up</button>
    </div>
  </header>
</template>

<style></style>
