<template>
  <div>
    <no-ssr>
      <b-modal 
        ref="myModalRef"
        :title="header" 
        hide-footer>
        <div class="d-block text-center">
          <h3>{{ title }}</h3>
        </div>
        <b-btn 
          class="mt-1" 
          variant="outline-danger" 
          block 
          @click="hideModal">Đóng</b-btn>
      </b-modal>      
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'BoostrapModal',
  props: {
    header: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>

<style>
</style>
