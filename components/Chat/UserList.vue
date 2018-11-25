<template>
  <div class="online-members">
    <aside class="channels"><header class="channels-header focusable"><h3 
      role="header" 
      class="channels-header-name">Danh Sách Trực Tuyến</h3></header>  
      <user-preview 
        v-for="user in users"
        :key="user.id"
        :username="user.username"/>
    </aside>
  </div>
</template>

<script>
import UserPreview from '@/components/Chat/UserPreview.vue'
export default {
  components: {
    UserPreview
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
