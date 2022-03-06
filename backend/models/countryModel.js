import mongoose from 'mongoose'

const countrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    required: true,
  },
})

const Country = mongoose.model('Country', countrySchema)

export default Country
