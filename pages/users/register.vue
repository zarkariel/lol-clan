<template>
  <div>
    <BoostrapModal 
      ref="boostrapModal" 
      :header="modal.header" 
      :title="modal.title" />
    <div class="container-fluid register h-100">
      <div class="row">
        <div class="col-md-3 register-left">
          <img 
            src="/img/lmht-bieu-cam-1-23-03-2018.png" 
            alt="" >
          <h3>Xin chào</h3>
          <p>Bạn nên nhập đúng tên nhân vật trong LOL để sử dụng các tính năng nâng cao nhé !!!</p>
          <input 
            type="submit" 
            name="" 
            value="Login" >
          <br>
        </div>
        <RegisterForm @submit="onSubmitted"/>
      </div>
    </div>
    <IndexContact/>
  </div>
</template>

<script>
import axios from 'axios'
import IndexContact from '@/components/Index/Contact.vue'
import RegisterForm from '@/components/Register/RegisterForm.vue'
import BoostrapModal from '@/components/UI/Boostrap/Modal.vue'

export default {
  layout: 'default',
  components: {
    IndexContact,
    RegisterForm,
    BoostrapModal
  },
  data() {
    return {
      modal: {
        header: '',
        title: ''
      }
    }
  },
  head() {
    return {
      title: 'Register'
    }
  },
  methods: {
    onSubmitted(postData) {
      console.log(postData)
      return this.$axios
        .$post('/api/user/register', postData)
        .then(data => {
          console.log(data.message)
          this.showMessage(data.title, data.message)
          if (data.success) {
            setTimeout(() => {
              console.log('Register sucesss')
              this.$router.push('/users/login')
            }, 3000)
          }
        })
        .catch(e => console.log(e))
    },
    showMessage(header, title) {
      console.log('Show modal ')
      this.modal.header = header
      this.modal.title = title
      this.$refs.boostrapModal.showModal()
    }
  }
}
</script>

<style>
.register {
  background: #2b2c2d;
  padding-top: 55px;
  padding-bottom: 100px;
}
.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}
.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 5%;
  margin-bottom: 5%;
  cursor: pointer;
}
.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}
.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 50%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}
.register .register-form {
  padding: 10%;
  margin-top: 10%;
}
.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}
.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}
.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover {
  border: none;
}
.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}
</style>
