import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      SocketUser: null,
      currentUsername: null,
      currentUserId: null,
      totalUsers: null,
      LoggedInUsers: [],
      ChatMessages: []
    },
    mutations: {
      SET_CHAT_MESSAGES(state, chatMessages) {
        state.ChatMessages = ChatMessages
      },
      ADD_CHAT_MESSAGE(state, chat) {
        state.ChatMessages.push(chat)
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state, token) {
        state.token = null
      },
      ADD_USER(state, user) {
        state.LoggedInUsers.push({ username: user })
      },
      REMOVE_USER(state, user) {
        let currentIndex = state.LoggedInUsers.findIndex(
          data => data.username == user
        )

        if (currentIndex > -1) {
          state.LoggedInUsers.splice(currentIndex, 1)
        }
      },
      SET_CURRENT_USERNAME(state, user) {
        state.currentUsername = user
      },
      SET_CURRENT_USERID(state, userId) {
        state.currentUserId = userId
      },
      CLEAR_CURRENT_USERNAME(state, user) {
        state.currentUsername = null
      },
      CLEAR_CURRENT_USERID(state, user) {
        state.currentUserId = null
      },
      CLEAR_SOCKET_USER(state, user) {
        state.SocketUser = null
      },
      SET_TOTAL_USERS(state, numUser) {
        state.totalUsers = numUser
      },
      CLEAR_TOTAL_USERS(state, numUser) {
        state.totalUsers = 0
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        for (let i = 0; i < 20; i++) {
          let chat = {
            username: 'Ông Thánh 8k',
            time: Date().toString(),
            message: 'Test thử cái'
          }

          vuexContext.commit('ADD_CHAT_MESSAGE', chat)
        }
      },
      authUser(vuexContext, authData) {
        vuexContext.commit('SET_TOKEN', authData.token)
        vuexContext.commit(
          'SET_CURRENT_USERNAME',
          authData.currentUser.username
        )
        vuexContext.commit('SET_CURRENT_USERID', authData.currentUser._id)

        localStorage.setItem('token', authData.token)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + 84600 * 1000
        )
        Cookie.set('jwt', authData.token)
        Cookie.set('expirationDate', new Date().getTime() + 84600 * 1000)

        //set for current username
        localStorage.setItem('currentUsername', authData.currentUser.username)
        Cookie.set('currentUsername', authData.currentUser.username)

        //set for current user id
        localStorage.setItem('currentUserId', authData.currentUser._id)
        Cookie.set('currentUserId', authData.currentUser._id)
      },
      initAuth(vuexContext, req) {
        let token
        let expirationDate
        let currentUsername
        let currentUserId
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]

          currentUsername = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('currentUsername='))
            .split('=')[1]

          currentUserId = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('currentUserId='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
          currentUsername = localStorage.getItem('currentUsername')
          currentUserId = localStorage.getItem('currentUserId')
        }
        if (new Date().getTime() >= expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }

        vuexContext.commit('SET_TOKEN', token)
        vuexContext.commit('SET_CURRENT_USERNAME', currentUsername)
        vuexContext.commit('SET_CURRENT_USERID', currentUserId)
        console.log('lay thong tin user id ' + currentUserId)

        this.$axios
          .$post(process.env.API_URL + '/api/user/getUserById', {
            id: currentUserId
          })
          .then(result => {
            console.log('Data returned : ' + result.currentUser.username)
          })
          .catch(err => {})
      },
      logout(vuexContext) {
        vuexContext.commit('CLEAR_TOKEN')
        vuexContext.commit('CLEAR_CURRENT_USERNAME')
        vuexContext.commit('CLEAR_CURRENT_USERID')
        //clear socket
        vuexContext.commit('CLEAR_SOCKET_USER')

        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        Cookie.remove('currentUsername')
        Cookie.remove('currentUserId')

        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
          localStorage.removeItem('currentUsername')
          localStorage.removeItem('currentUserId')
        }
        this.$router.push('/users/login')
      },
      setSocket(vuexContext, socketData) {
        console.log('Set socket from store')
        console.log(
          'socketData : ' +
            socketData.Username +
            '.Socket id ' +
            socketData.SocketId
        )
        vuexContext.commit('UPDATE_USER_SOCKET_ID', socketData)
      },
      addNewUser(vuexContext, newUser) {
        vuexContext.commit('ADD_USER', newUser)
      },
      removeUser(vuexContext, removeUser) {
        vuexContext.commit('REMOVE_USER', removeUser)
      },
      setTotalUser(vuexContext, numUser) {
        vuexContext.commit('SET_TOTAL_USERS', numUser)
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      },
      loadChatMessages(state) {
        return state.ChatMessages
      },
      getCurrentUsername(state) {
        return state.currentUsername
      },
      getCurrentUserId(state) {
        return state.currentUserId
      },
      getNumberOfUserOnline(state) {
        return state.totalUsers
      },
      getLoggedInUsers(state) {
        return state.LoggedInUsers
      }
    }
  })
}

export default createStore
