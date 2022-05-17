import validator from 'validator'
import {mongoose} from "../db/mongooseConnection-db";
import jwt from "jsonwebtoken";

export let entitySchema = {
    Action: new mongoose.Schema({
        text: {
            type: String,
            required: true,
            minLength: 2,
            trim: true,
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        }
    }),
    User: new mongoose.Schema({
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
        }]
    })
}

entitySchema.User.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'ehsan');
    user.tokens.push({token, access});
    return user.save().then(() => {
        return Object.assign({token}, {data: user._doc});
    })
}

// entitySchema.User.statics.findByToken = function (token) {
//     let User = this;
//     let decoded: any;
//     try {
//         decoded = jwt.verify(token, 'ehsan');
//     } catch (e) {
//
//     }
//     User.findOne({
//         '_id': decoded?._id,
//         'tokens.token': token,
//         'tokens.access': 'auth'
//     })
// }



