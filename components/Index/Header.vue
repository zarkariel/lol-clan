<template>
  <!-- Header -->
  <header class="masthead">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-lg-7 my-auto" />
        <div class="col-lg-5 my-auto">
          <div class="device-container">
            <div class="device-mockup iphone6_plus portrait white">
              <div class="device">
                <div class="screen">
                  <!-- Demo image for screen mockup, you can put an image here, some HTML, an animation, video, or anything else! -->
                  <img 
                    src="img/mobile-app.webp" 
                    class="img-fluid" 
                    alt="">
                </div>
              </div>
            </div> 
            <div class="header-content mb-4 mt-4">
              <nuxt-link 
                class="btn btn-primary btn-dark btn-xl" 
                to="/chat">Mở ứng dụng</nuxt-link>
            </div>              
          </div>   
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'IndexHeader'
}
</script>
