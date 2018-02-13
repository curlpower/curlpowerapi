'use strict'

const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Survey'
  },
  question: {
    type: String,
    required: true
  },
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

module.exports = Survey
