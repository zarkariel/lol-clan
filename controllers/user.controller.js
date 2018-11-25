const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//get user by user id
exports.getUserById = function(req, res) {
  const { id } = req.body
  const valid = id.length

  if (!valid) {
    return res.send({
      success: false,
      message: 'Thông tin nhập chưa chính xác.'
    })
  }

  User.findById(id, function(err, doc) {
    if (doc == null || !doc.length) {
      return res.send({
        success: false,
        message: 'Không tìm thấy ID này'
      })
    }

    return res.send({
      success: true,
      currentUser: doc[0]
    })
  })
}

//for api login
exports.login = function(req, res) {
  const { username, password } = req.body
  const valid = username.length && password.length
  if (!valid) {
    return res.send({
      success: false,
      message: 'Thông tin nhập chưa chính xác.'
    })
  }

  User.find({ username: username, password: password }, function(err, doc) {
    if (!doc.length) {
      return res.send({
        success: false,
        message: 'Sai tài khoản hoặc mật khẩu.'
      })
    } else {
      //create token
      let token = jwt.sign({ id: doc._id }, 'lolclanapp', {
        expiresIn: 86400 //expire in 24 hours
      })
      return res.send({
        success: true,
        message: 'Bạn đã đăng nhập thành công.',
        token: token,
        currentUser: doc[0]
      })
    }
  })
}

//for api register
exports.register = function(req, res) {
  const { username, password, ign } = req.body
  const valid = username.length && password.length && ign.length

  if (!valid) {
    return res.send({
      success: false,
      message: 'Thông tin nhập chưa chính xác'
    })
  }

  User.find({ username: username }, function(err, doc) {
    if (!doc.length) {
      let user = new User({
        username: username,
        password: password,
        ign: ign,
        level: 1,
        mmr: 0,
        rank: 'Chưa có rank'
      })

      user.save(function(err) {
        if (err) {
          console.log('Err:' + err)
          next(err)
        }
        res.send({
          success: true,
          title: 'Chúc mừng',
          message: 'Bạn đã tạo tài khoản ' + username + ' thành công !!!'
        })
      })
    } else {
      res.send({
        success: false,
        title: 'Có lỗi',
        message: 'Tài khoản ' + username + ' đã tồn tại !!!'
      })
    }
  })
}
