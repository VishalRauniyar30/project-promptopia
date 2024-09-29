const { Schema, model, models } = require("mongoose");


const promptSchema = new Schema({
    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    prompt : {
        type : String,
        required : [true, 'Prompt is Required']
    },
    tag : {
        type : String,
        required : [true, 'Tag is Required']
    }
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;