const { Schema, model, default: mongoose } = require('mongoose');
const validator = require('validator');
const ObjectId = mongoose.Types.ObjectId;

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ObjectId()
      },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username:{
        type: String,
        required: true
    },
    created_at: {
          type: Date,
          default: Date.now,
          get: (date) => {
              if (date) return date.toISOString().split("T") [0];
          },
    }
  });

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      maxLength: 280,
      required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString().split("T") [0];
        },
    },
    username:{
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],

  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('thoughtCount').get(function () {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;