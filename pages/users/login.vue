<template>
  <div class="login-dark">
    <BoostrapModal 
      ref="boostrapModal" 
      :header="modal.header" 
      :title="modal.title" />
    <form 
      method="post" 
      @submit.prevent="onSubmit">
      <h2 class="sr-only">Login Form</h2>
      <div class="illustration">
        <img 
          src="/img/lulu-emote.png" 
          class="login-img">
      </div>
      <div class="form-group"><input 
        v-model="authData.username" 
        class="form-control" 
        type="username" 
        name="username"
        placeholder="Tài khoản"></div>
      <div class="form-group"><input 
        v-model="authData.password"
        class="form-control" 
        type="password" 
        name="password" 
        placeholder="Mật khẩu"></div>
      <div class="form-group"><button 
        class="btn btn-primary btn-block" 
        type="submit">Đăng nhập</button></div>
      <nuxt-link 
        to="/users/register/"
        class="forgot" 
      >Bạn chưa đăng kí tài khoản ?</nuxt-link>
    </form>
  </div>
</template>

<script>
import BoostrapModal from '@/components/UI/Boostrap/Modal.vue'
export default {
  components: {
    BoostrapModal
  },
  data() {
    return {
      authData: {
        username: '',
        password: '',
        token: '',
        currentUser: {
          type: Object,
          default: null
        }
      },
      modal: {
        header: '',
        title: ''
      }
    }
  },
  methods: {
    checkValid() {
      return this.authData.username.length && this.authData.password.length
    },
    onSubmit() {
      console.log('Submit')
      if (!this.checkValid()) {
        this.showMessage('Có lỗi', 'Chưa nhập đúng thông tin.')
      }

      return this.$axios
        .$post('/api/user/login', this.authData)
        .then(result => {
          if (result.success) {
            console.log(result)
            this.showMessage('Chúc mừng', result.message)
            this.authData.token = result.token
            this.authData.currentUser = result.currentUser
            //dispatch to vuex store
            this.$store.dispatch('authUser', this.authData)
            this.$router.push('/chat')
          } else {
            this.showMessage('Thông tin không chính xác', result.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
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

<style scope>
.login-dark {
  height: 1000px;
  background: #475d62 url('/img/lol_background.png');
  background-size: cover;
  position: relative;
}

.login-dark form {
  max-width: 320px;
  width: 90%;
  background-color: #1e2833;
  padding: 40px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
}

.login-dark .illustration {
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #2980ef;
}

.login-dark form .form-control {
  background: none;
  border: none;
  border-bottom: 1px solid #434a52;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
}

.login-dark form .btn-primary {
  background: #214a80;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none;
}

.login-dark form .btn-primary:hover,
.login-dark form .btn-primary:active {
  background: #214a80;
  outline: none;
}

.login-dark form .forgot {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  opacity: 0.9;
  text-decoration: none;
}

.login-dark form .forgot:hover,
.login-dark form .forgot:active {
  opacity: 1;
  text-decoration: none;
}

.login-dark form .btn-primary:active {
  transform: translateY(1px);
}

.ion-ios-locked-outline:before {
  content: '\f457';
}
.login-img {
  width: 200px;
}
</style>
