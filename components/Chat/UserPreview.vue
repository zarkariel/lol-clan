<template>
  <footer class="channels-footer"><img 
    alt="Avatar" 
    src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png" 
    class="avatar"> 
    <div class="channels-footer-details">
      <span class="username">{{ username }}</span> 
    </div> 
  </footer>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
