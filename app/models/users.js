var mongooes = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongooes.set('useCreateIndex', true); // To stop DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

var userSchema = new mongooes.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    first_name: String,
    last_name: String,
    img: String,
    boards: [
        {
            type: mongooes.Schema.Types.ObjectId,
            ref: 'Board'
        }
    ]
});

userSchema.pre('save', function (next) {

    var user = this;

    if (!user.isModified('password')) {
        return next;
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    })
});

userSchema.methods.comparePassword = function (planPassword, cb) {
    bcrypt.compare(planPassword, this.password, function (err, isMatched) {
        if (err) return next(err);
        cb(null,isMatched);
    });
};

module.exports = mongooes.model('User', userSchema);