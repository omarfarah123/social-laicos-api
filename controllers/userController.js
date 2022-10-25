const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;
module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({message: 'No user with that ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
        },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) =>
                !user
                  ? user.status(404).json({message: 'No thought with that ID'})
                  : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User and thoughts deleted!'}))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {runValidators: true, new: true }
        )
            .then((user) => 
                !user
                  ? res.status(404).json({message: 'No user with this id!'})
                  : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        console.log('You are adding an friend');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId} },
          { runValidators: true, new: true }
        )
          .then((friend) =>
            !friend
              ? res
                  .status(404)
                  .json({ message: 'No friend found with that ID :(' })
              : res.json(friend)
          )
          .catch((err) => res.status(500).json(err));
      },
      
      removeFrined(req, res) {
        console.log("You are removing a friend")
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId }},
          { runValidators: true, new: true }
        )
          .then((friend) =>
            !friend
              ? res
                  .status(404)
                  .json({ message: 'No friend found with that ID :(' })
              : res.json(friend)
          )
          .catch((err) => res.status(500).json(err));
      },

}