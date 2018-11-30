<template>
  <!-- Navigation -->
  <nav 
    id="mainNav" 
    class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container">
      <a class="navbar-brand">
        <img 
          src="/img/challenger_1.png" 
          class="img-fluid icon">
      </a>
      <button 
        class="navbar-toggler navbar-toggler-right" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarResponsive" 
        aria-controls="navbarResponsive" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <i class="fas fa-bars" />
      </button>
      <nuxt-link 
        class="navbar-brand js-scroll-trigger ml-auto" 
        to="/">Lol Clan App</nuxt-link>
     
      <div 
        id="navbarResponsive" 
        class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a 
              class="nav-link js-scroll-trigger" 
              href="#download">Download</a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link js-scroll-trigger" 
              href="#features">Tính năng</a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link js-scroll-trigger" 
              href="#contact">Liên hệ</a>
          </li>
          <li class="nav-item">
            <nuxt-link 
              class="nav-link js-scroll-trigger" 
              to="/users/login">
              Đăng nhập
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>
