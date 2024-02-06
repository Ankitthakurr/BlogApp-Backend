import mongoose from "mongoose";

const Data = new mongoose.Schema({
    tittle : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users' ,
        required : true
    }
},{
    timestamps : true
})

export default mongoose.model("data",Data)