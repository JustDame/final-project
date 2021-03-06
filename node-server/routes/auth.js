const express = require('express')
const yup = require('yup')
const knex = require('../database')
const bcrypt = require('bcrypt')
const { formatValidationErrors } = require('../lib/error')
const authMiddleware = require('../middleware/auth')

const router = express.Router()
const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})
const registrationSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(8).max(100),
  password_confirmation: yup
    .string()
    .required()
    .test({
      name: 'equals',
      message: 'passwords do not match',
      test: function (value) {
        return value === this.parent.password
      },
    }),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
})

router.post('/login', async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false })

    const data = loginSchema.cast(req.body)

    const user = await knex('users')
      .where(knex.raw('username = ?', [data.username]))
      .first()

    if (!user) {
      return res.status(404).send({
        message: 'Incorrect username or password',
      })
    }

    const matches = await bcrypt.compare(data.password, user.password)
    if (matches) {
      req.session.userId = user.id

      delete user.password
      res.status(200).send({
        message: 'Logged in',
        user,
      })
    } else {
      res.status(403).send({
        message: 'Incorrect username or password',
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorRes = formatValidationErrors(error)
      res.status(400).send(errorRes)
    }
    console.log('Error on login', error)
  }
})
router.post('/register', async (req, res) => {
  try {
    await registrationSchema.validate(req.body, { abortEarly: false })
    const { password_confirmation, ...data } = registrationSchema.cast(req.body)

    // Hash the user's password so it's no longer in plaintext
    data.password = await bcrypt.hash(data.password, 10)

    const userId = await knex('users').insert(data)
    const user = await knex('users').where('id', userId).first()
    // Delete the user's password from the object so when we send the created user back
    // we don't share their password
    if (user) delete user.password

    // Log the user in
    req.session.userId = user.id
    return res.status(200).send({
      message: 'User created and logged in',
      user,
    })
  } catch (error) {
    console.log(error)

    if (error.name === 'ValidationError') {
      const errorRes = formatValidationErrors(error)
      return res.status(400).send(errorRes)
    }

    res.status(500).send({
      message: 'An error occurred',
    })
  }
})

router.get('/profile', authMiddleware, async (req, res) => {
  console.log(req.session.userId)
  const user = await knex('users')
    .select('id')
    .select('username')
    .select('first_name')
    .select('last_name')
    .where(knex.raw('id = ?', [req.session.userId]))
    .first()

  res.send({ user })
})

module.exports = router
