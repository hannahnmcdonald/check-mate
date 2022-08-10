const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const winSchema = require('./Win');
const lossSchema = require('./Loss');
const tieSchema = require('./Tie');

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true
		},
		lastName: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must use a valid email address'],
		},
		username: {
			type: String,
			required: false,
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
		},
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		games: [
			{ 
				name: String, date: {
				type: Date,
				default: Date.now,
				}
			}
		],
		// + Change wins to be array of objects containing game and number of wins
		wins: [ winSchema ],
		losses: [ lossSchema],
		ties: [ tieSchema ],
		avatar: {
			type: String,
			default: 'https://i.imgur.com/X2JhY8J.png',
		}
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// hash user password
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
