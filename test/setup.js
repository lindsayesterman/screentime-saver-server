const { expect } = require('chai')
const supertest = require('supertest')
process.env.JWT_SECRET = 'authToken'

global.expect = expect
global.supertest = supertest