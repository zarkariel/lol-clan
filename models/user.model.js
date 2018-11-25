const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  username: { type: String, require: true, max: 30 },
  password: { type: String, required: true, max: 50 },
  ign: { type: String, require: true, max: 32 },
  level: { type: Number, require: true, max: 4 },
  mmr: { type: Number, require: true, max: 3 },
  rank: { type: String, require: true, max: 20 }
})

//export user model
module.exports = mongoose.model('User', UserSchema)
