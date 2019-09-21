const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _streetArt: { type: Schema.Types.ObjectId, ref: 'StreetArt' },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Visit', schema)
