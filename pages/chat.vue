<template>
  <div class="chat">
    <div class="chat-history">
      <ChatList :chats="messages" />
    </div> <!-- end chat-history -->
      
    <div class="chat-message clearfix">
      <input 
        id="message-to-send" 
        v-model="message" 
        name="message-to-send" 
        placeholder ="Type your message"
        @keyup.enter="sendMessage">
                

    </div> <!-- end chat-message -->
      
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatList from '@/components/Chat/ChatList.vue'
export default {
  middleware: ['check-auth', 'auth'],
  layout: 'chat',
  components: {
    ChatList
  },
  data() {
    return {
      message: '',
      messages: [],
      socket: '',
      isLoading: true,
      socketInfo: {
        SocketId: {
          type: String,
          required: true
        },
        Username: {
          type: String,
          required: true
        }
      }
    }
  },
  computed: {
    getCurrentUsername() {
      return this.$store.getters.getCurrentUsername
    },
    loadedChatMessages() {
      return this.$store.getters.loadChatMessages
    }
  },
  mounted() {
    this.socket = io()

    this.socket.on('new-message', message => {
      this.messages.push(message || {})
    })

    //on event count users
    this.socket.on('count-users', data => {
      //dispatch action to store
      this.$store.dispatch('setTotalUser', data.numUsers)
    })

    //on event when new user logged in
    this.socket.on('user-joined', data => {
      //dispatch action to store
      this.$store.dispatch('setTotalUser', data.numUsers)
      this.$store.dispatch('addNewUser', data.username)
    })

    //on event when user disconnected
    this.socket.on('user-disconnected', data => {
      //dispath action to store
      this.$store.dispatch('removeUser', data.username)
      this.$store.dispatch('setTotalUser', data.numUsers)
    })

    setTimeout(() => {
      this.isLoading = false
      this.initSocket()
    }, 1000)
  },
  methods: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUsername
    },
    initSocket() {
      this.socketInfo.SocketId = this.socket.id
      this.socketInfo.Username = this.getCurrentUser()
      this.$store.dispatch('addNewUser', this.socketInfo.Username)
      this.socket.emit('add-user', this.socketInfo.Username)
    },
    sendMessage() {
      if (!this.message.trim()) {
        return
      }

      let now = new Date().toString()

      let message = {
        username: this.socketInfo.Username,
        time: now,
        message: this.message.trim()
      }

      this.messages.push(message)

      this.socket.emit('send-message', message)

      this.message = ''
    }
  }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:400, 700);
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  background: #c5ddeb;
  font: 14px/20px 'Lato', Arial, sans-serif;
  padding: 40px 0;
  color: white;
}

.container {
  margin: 0 auto;
  width: 750px;
  background: #444753;
  border-radius: 5px;
}

.people-list {
  width: 260px;
  float: left;
}
.people-list .search {
  padding: 20px;
}
.people-list input {
  border-radius: 3px;
  border: none;
  padding: 14px;
  color: white;
  background: #6a6c75;
  width: 90%;
  font-size: 14px;
}
.people-list .fa-search {
  position: relative;
  left: -25px;
}
.people-list ul {
  padding: 20px;
  height: 770px;
}
.people-list ul li {
  padding-bottom: 20px;
}
.people-list img {
  float: left;
}
.people-list .about {
  float: left;
  margin-top: 8px;
}
.people-list .about {
  padding-left: 8px;
}
.people-list .status {
  color: #92959e;
}

.chat {
  width: 100%;
  height: 100%;
  float: left;
  background: #36393f;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #434651;
  position: relative;
}
.chat .chat-header {
  padding: 20px;
  border-bottom: 2px solid white;
}
.chat .chat-header img {
  float: left;
}
.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
  margin-top: 6px;
}
.chat .chat-header .chat-with {
  font-weight: bold;
  font-size: 16px;
}
.chat .chat-header .chat-num-messages {
  color: #92959e;
}
.chat .chat-header .fa-star {
  float: right;
  color: #d8dadf;
  font-size: 20px;
  margin-top: 12px;
}
.chat .chat-history {
  padding: 30px 30px 20px;
  border-bottom-color: rgba(255, 255, 255, 0.02);
  overflow-y: scroll;
  height: 80%;
  font-family: Whitney, Helvetica Neue, Helvetica, Arial, sans-serif;
}

.chat .chat-history::-webkit-scrollbar {
  width: 10px;
  background: #202225;
  border-radius: 7px;
}

.chat .chat-history::-webkit-scrollbar-thumb {
  background-color: #202225;
  border-color: #36393f;
}

.chat .chat-history::-webkit-scrollbar-thumb,
.scroller-wrap .scroller::-webkit-scrollbar-track-piece {
  background-clip: padding-box;
  background-color: #2f3136;
  border-color: #202225;
  border-radius: 7px;
}

/**.chat .chat-history::-webkit-scrollbar-track-piece {
  background-clip: padding-box;
  background-color: #ffffff;
  border: 3px solid #fff;
  border-radius: 7px;
  background-clip: padding-box;
  background-color: #7289da;
  border: 3px solid #fff;
  border-radius: 7px;
}**/

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

.chat .chat-history .my-message {
}
.chat .chat-history .other-message {
}
.chat .chat-history .other-message:after {
  border-bottom-color: #94c2ed;
  left: 93%;
}
.chat .chat-message {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
.chat .chat-message input {
  width: 100%;
  border: none;
  padding: 10px 20px;
  font: 14px/22px 'Lato', Arial, sans-serif;
  margin-bottom: 10px;
  border-radius: 5px;
  resize: none;
  background: rgba(114, 118, 125, 0.3);
  max-height: 144px;
  min-height: 20px;
  color: hsla(0, 0%, 100%, 0.7);
  -webkit-appearance: none;
}
.chat .chat-message .fa-file-o,
.chat .chat-message .fa-file-image-o {
  font-size: 16px;
  color: gray;
  cursor: pointer;
}
.chat .chat-message button {
  float: right;
  color: #94c2ed;
  font-size: 16px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: #f2f5f8;
}
.chat .chat-message button:hover {
  color: #75b1e8;
}

.message-data-name {
  color: white;
  font-size: 1rem;
}

.online,
.offline,
.me {
  margin-right: 3px;
  font-size: 10px;
}

.online {
  color: #86bb71;
}

.offline {
  color: #e38968;
}

.me {
  color: #94c2ed;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.float-right {
  float: left;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}

/* Large devices (large desktops, 1200px and up) */
@media (min-height: 600px) {
  .chat .chat-history {
    height: 500px !important;
  }
}

@media (min-height: 900px) {
  .chat .chat-history {
    height: 820px !important;
  }
}
</style>
