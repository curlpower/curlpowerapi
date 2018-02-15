'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Survey = models.survey.Survey
const Submission = models.survey.Submission

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Survey.findById(req.body.surveyid)
    .then(survey => res.json({
      submissions: survey.submissions.map((e) =>
          e.toJSON({ user: req.user }))
    }))
    .catch(next)
}

const create = (req, res, next) => {
  const submission = Object.assign(req.body.submissions, {
    _submitter: req.user._id
  })
  Submission.create(submission)
    .then(submission => {
      Survey.findById(req.body.surveyid)
        .then(survey => {
          survey.submissions.push(submission)
          survey.save()
          return submission
        })
        .then(submission =>
          res.status(201)
            .json({
              submission: submission.toJSON({ user: req.user })
            })
          )
        .catch(next)
    })
    .catch(next)
}

module.exports = controller({
  index,
  create
}, { before: [
  { method: setUser, only: ['index'] },
  { method: authenticate, except: ['index'] },
  { method: setModel(Survey, { forUser: true }), only: ['update'] }
] })
