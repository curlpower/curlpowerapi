'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Survey = models.survey.Survey
const Submission = models.survey.Submission

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
  const submission = Object.assign(req.body.submissions, {
    _submitter: req.user._id
  })
  Submission.create(submission)
    .then(submission => {
      Survey.findById('5a84a346d2b9bac77b9b6ff6')
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

const update = (req, res, next) => {
  // console.log('req params ', req.params)
  // console.log('req submission', req.body.submissions)
  const submission = Object.assign(req.body.submissions, {
    _submitter: req.user._id
  })

  Survey.findById('5a84a346d2b9bac77b9b6ff6')
    .then(survey => {
      survey.submissions.push(submission)
      // console.log(survey)
      return survey
    })
    .then(survey => {
      survey.update(survey.submissions)
      console.log(survey)
    })
    .catch(console.error)
  next()
  // console.log('thingy', thingy)

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
