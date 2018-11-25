<template>
  <ul>
    <ChatPreview
      v-for="chat in chats"
      :key="chat.id"
      :username="chat.username"
      :time="chat.time"
      :message="chat.message"
    />
  </ul>
</template>

<script>
import ChatPreview from '@/components/Chat/ChatPreview.vue'
export default {
  components: {
    ChatPreview
  },
  props: {
    chats: {
      type: Array,
      required: true
    }
  }
}
</script>
