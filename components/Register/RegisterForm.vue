<template>
  <div class="col-md-9 register-right">
    <BoostrapModal 
      ref="boostrapModal" 
      :header="modal.header" 
      :title="modal.title" />
    <div 
      id="myTabContent" 
      class="tab-content">
      <div 
        id="home" 
        class="tab-pane fade show active" 
        role="tabpanel" 
        aria-labelledby="home-tab">
        <h3 class="register-heading">Đăng kí tài khoản</h3>
        <form 
          class="row register-form" 
          @submit.prevent="submitForm">
          <div class="col-md-6">        
            <BoostrapFormInput               
              id="username" 
              v-model="newUser.username"
              live-help="Tài khoản dùng để đăng nhập"
              type="text"
              control-type="text"
              @value="newUser.username">Tên tài khoản </BoostrapFormInput> 
            <BoostrapFormInput               
              id="password" 
              v-model="newUser.password"
              live-help="Mật khẩu để đăng nhập"
              type="password"
              control-type="password">Mật khẩu </BoostrapFormInput> 
          </div>
          <div class="col-md-6">
            <BoostrapFormInput               
              id="ign" 
              v-model="newUser.ign"
              live-help="Tên nhân vật trong game LOL"
              type="text"
              control-type="text">Tên nhân vật </BoostrapFormInput> 
            <BoostrapFormInput               
              id="confirmPassword" 
              v-model="newUser.confirmPassword"
              live-help="Nhập lại đúng mật khẩu"
              type="[asswprd]"
              control-type="password">Nhập lại mật khẩu </BoostrapFormInput> 
            <input 
              type="submit" 
              class="btnRegister"
              value="Đăng kí" 
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BoostrapModal from '@/components/UI/Boostrap/Modal.vue'
import BoostrapFormInput from '@/components/UI/Boostrap/FormInput.vue'
export default {
  name: 'RegisterForm',
  components: {
    BoostrapModal,
    BoostrapFormInput
  },
  data() {
    return {
      newUser: {
        username: '',
        ign: '',
        password: '',
        confirmPassword: ''
      },
      modal: {
        header: '',
        title: ''
      }
    }
  },
  methods: {
    checkFormData() {
      if (
        this.newUser.username.length == 0 ||
        this.newUser.ign.length == 0 ||
        this.newUser.password.length == 0 ||
        this.newUser.confirmPassword.length == 0
      ) {
        return false
      }
      return true
    },
    checkPassword() {
      return this.newUser.password == this.newUser.confirmPassword
        ? true
        : false
    },
    submitForm(postData) {
      if (!this.checkFormData()) {
        this.showMessage(
          'Bạn nhập chưa chính xác',
          'Bạn nên nhập đầy đủ thông tin.'
        )
        return false
      }
      if (!this.checkPassword()) {
        this.showMessage(
          'Bạn nhập chưa chính xác',
          'Hai mật khẩu không giống nhau.'
        )
        return false
      }
      this.$emit('submit', this.newUser)
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
