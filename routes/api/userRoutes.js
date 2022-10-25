const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFrined
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
router
     .route('/:userId/friends/:friendId')
     .post(addFriend)
     .delete(removeFrined)

module.exports = router