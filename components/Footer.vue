<template>
  <footer>
    <div class="container">
      <p>&copy; Lol Clan App {{ currentYear }}. All Rights Reserved.</p>
      <ul class="list-inline">
        <li class="list-inline-item">
          <a href="#">Hướng dẫn sử dụng</a>
        </li>
        <li class="list-inline-item">
          <a href="#">Điều khoản sử dụng</a>
        </li>
        <li class="list-inline-item">
          <a href="#">FAQ</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
</style>
