const { AuthenticationError } = require('apollo-server-express');
const { User, Altrules, Win } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    userInfo: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    allUsers: async (_, args) => {
        const userData = await User.find({}).select('-__v -password');
        return userData;
      },

    findFriends: async (parent, args, context) => {
    const { search = ""} = args;

      const friendData = await User.find({
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
      ],
    }).select('-__v -password');

    return friendData;
    },

    getFriends: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.find({ _id: context.user._id }).select('-__v -password').populate('friends');
        return userData;
      }
    },

    findaltrules: async (parent, args) => {
      const { game_id } = args;
      return Altrules.find({game_id: game_id});
    }
  },


  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addFriend: async (parent, {friendID}, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { friends: friendID } },
          { new: true }
        );
      }
    },
    
    addWin: async (parent, args, context) => {
      console.log("Args from results: ", args)
      // > Every time somone wins monopoly give object { game: "monopoly", wins: 1 } to user.wins
        const user = await User.findOneAndUpdate({
          firstName: args.firstName,
        }, { $push: { wins: {game: args.game, wins: 1} }}, {
          new: true,
        });
        return user;
    },

    addLoss: async (parent, args, context) => {
      console.log("Args from results: ", args)
      // > Every time somone loses monopoly give object { game: "monopoly", wins: 1 } to user.losses
        const user = await User.findOneAndUpdate({
          firstName: args.firstName,
        }, { $push: { losses: {game: args.game, losses: 1} }}, {
          new: true,
        });
        return user;
    },

    addTie: async (parent, args, context) => {
      console.log("Args from results: ", args)
      // > Every time somone wins monopoly give object { game: "monopoly", wins: 1 } to user.wins
        const user = await User.findOneAndUpdate({
          firstName: args.firstName,
        }, { $push: { ties: {game: args.game, ties: 1} }}, {
          new: true,
        });
        return user;
    },

    addRules: async (parent, args) => {
      const altrules = await Altrules.create(args);

      return  altrules ;

    },
    
  }
}

module.exports = resolvers;
