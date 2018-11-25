<template>
  <section 
    id="features" 
    class="features">
    <div class="container">
      <div class="section-heading text-center">
        <h2>Niềm vui không giới hạn</h2>
        <p class="text-muted">Hãy xem những tính năng mà chúng tôi mang đến cho bạn !!!</p>
        <hr>
      </div>
      <div class="row">
        <div class="col-lg-4 my-auto">
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
                <div class="button">
                  <!-- You can hook the "home button" to some JavaScript events or just remove it -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 my-auto">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-6">
                <div class="feature-item">
                  <i class="icon-screen-smartphone text-primary"/>
                  <h3>Di động</h3>
                  <p class="text-muted">Sử dụng đơn giản với điện thoại !</p>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="feature-item">
                  <i class="icon-camera text-primary"/>
                  <h3>Đơn giản</h3>
                  <p class="text-muted">Bạn có thể dùng ứng dụng này ngay trên trình duyệt !</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="feature-item">
                  <i class="icon-present text-primary"/>
                  <h3>Miễn phí</h3>
                  <p class="text-muted">Bạn có thể dùng ứng dụng này hoàn toàn miễn phí !</p>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="feature-item">
                  <i class="icon-lock-open text-primary"/>
                  <h3>Bảo mật</h3>
                  <p class="text-muted">Chỉ cần đăng nhập thông qua Facebook của chính bạn !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexFeatures'
}
</script>
