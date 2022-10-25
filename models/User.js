const { Schema, model, default: mongoose } = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

 

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email']
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
      },
  ],
    friends: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
})

const User = model('user', userSchema);

module.exports = User;