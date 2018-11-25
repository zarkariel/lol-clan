<template>
  <li>
    <div class="message-data">
      <span class="message-data-name"><i class="fa fa-circle online"/> {{ username }}</span>
      <span class="message-data-time">{{ time | date }}</span>
    </div>
    <div class="message my-message">
      {{ message }}
    </div>
  </li>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.chat .chat-history .message-data {
  margin-bottom: 5px;
}
.chat .chat-history .message-data-time {
  color: hsla(0, 0%, 100%, 0.2);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0;
  margin-left: 0.3rem;
  padding-left: 6px;
}
.chat .chat-history .message {
  color: #dcddde;
  width: 90%;
  position: relative;
  font-size: 0.9375rem;
  line-height: 1.3;
  user-select: text;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.message-data-name {
  color: white;
  font-size: 1rem;
}
</style>
