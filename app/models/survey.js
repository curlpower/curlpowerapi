'use strict'

const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
  answer: {
    type: Boolean,
    require: true
  },
  _submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._submitter)
      return ret
    }
  }
})

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Survey'
  },
  question: {
    type: String,
    required: true
  },
  submissions: [submissionSchema],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Survey = mongoose.model('Survey', surveySchema)
const Submission = mongoose.model('Submission', submissionSchema)

module.exports = {
  Survey,
  Submission
}
