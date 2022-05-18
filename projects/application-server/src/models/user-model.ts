import {ObjectId} from "mongodb";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";
import {Model, Schema, HydratedDocument} from "mongoose";


export interface IUserModel {
    _id?: ObjectId;
    email: string;
    password: string;
    tokens: [{
        access: string,
        token: string
    }],
}

export interface IUserMethods {
    generateAuthToken(): Promise<any>;

    removeTokens(token: string): Promise<HydratedDocument<IUserModel, IUserMethods>>;
}

export interface IUserStatics extends Model<IUserModel, any, IUserMethods> {
    findByCredentials(email: string, password: string): Promise<HydratedDocument<IUserModel, IUserMethods>>;

    findByToken(token: string): Promise<HydratedDocument<IUserModel, IUserMethods>>;
}

export let UserSchema = new Schema<IUserModel, IUserStatics, IUserMethods>({
    email: {
        type: String,
        required: [true, 'وارد کردن ایمیل الزامی است'],
        trim: true,
        minLength: 3,
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value)
            },
            message: (props: any) => `${props.value} معتبر نیست`
        }
    },
    password: {
        type: String,
        required: [true, 'وارد کردن رمز عبور الزامی است'],
        minLength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
})

UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});


// methods
UserSchema.method('generateAuthToken', function generateAuthToken() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'ehsan');
    user.tokens.push({token, access});
    return user.save().then(() => {
        return Object.assign({token}, {data: user._doc});
    })
});

UserSchema.method('removeTokens', function removeTokens(token) {
    let user = this;
    return user.findOneAndUpdate({
        $pull: {
            tokens: {token}
        }
    })
});


// statics
UserSchema.static('findByCredentials', function findByCredentials(email: string, password: string) {
    let User = this;
    return User.findOne({email}).then((user: any) => {
        if (!user) {
            return Promise.reject(new Error('value is not found'));
        }
        return new Promise<any>((resolve, reject) => {
            bcryptjs.compare(password, user.password).then(res => {
                if (res) {
                    resolve(user)
                } else {
                    reject('value is not found');
                }
            })
        })
    })
})

UserSchema.static('findByToken', function findByToken(token: string) {
    let User = this;
    let decoded: any;
    try {
        decoded = jwt.verify(token, 'ehsan');
    } catch (e) {

    }
    return User.findOne({
        '_id': decoded?._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
});
