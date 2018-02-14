'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Survey = models.survey

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Survey.find()
    .then(surveys => res.json({
      surveys: surveys.map((e) =>
        e.toJSON({ user: req.user }))
    }))
    .catch(next)
}

const create = (req, res, next) => {
  console.log('req params ', req.params)
  console.log('req submission', req.body.submissions)
  const submission = Object.assign(req.body.submissions, {
    _submitter: req.user._id
  })
  console.log('example submission', submission)
  // Survey.create(survey)
  //   .then(survey =>
  //     res.status(201)
  //       .json({
  //         survey: survey.toJSON({ user: req.user })
  //       }))
  //   .catch(next)
  next()
}

const update = (req, res, next) => {
  console.log('req params ', req.params)
  console.log('req submission', req.body.submissions)
  const submission = Object.assign(req.body.submissions, {
    _submitter: req.user._id
  })

  Survey.findById(req.params.id)
    .then(survey => {
      survey.submissions.push(submission)
      console.log(survey)
    })
  // console.log('thingy', thingy)
  next()
  // delete req.body.survey._owner  // disallow owner reassignment.

  // req.survey.update(req.body.survey)
  //   .then((survey) =>
  //   res.status(201)
  //     .json({
  //       survey: req.body.survey
  //     }))
  //   .catch(next)
}

module.exports = controller({
  index,
  create,
  update
}, { before: [
  { method: setUser, only: ['index'] },
  { method: authenticate, except: ['index'] },
  { method: setModel(Survey, { forUser: true }), only: ['update'] }
] })
