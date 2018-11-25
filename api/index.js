const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const users = require('./../routes/user.route')

// Import API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api/user/',
  handler: app
}
