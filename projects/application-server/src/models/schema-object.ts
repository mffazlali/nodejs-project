export let schemaObject = {
    Action: {
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
    },
    User: {
        name: {
            type: String,
            required: true,
            minLength: 2
        },
        age: {
            type: Number,
            required: true
        },
        location: {
            type: String
        }
    }
}