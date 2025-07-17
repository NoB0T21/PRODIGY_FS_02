import mongoose, { Document, Schema , Model} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface user extends Document{
    firstname: string;
    lastname: string;
    email: string;
    contactno: string
    DOB: string;
    gender: string;
    department: string;
    dateOfJoining: string;
    status:string;
    picture:string;
    path: string
}

const userSchema: Schema<user> = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    contactno: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    path:{
        type:String,
        required: true
    }
})

const user= mongoose.model<user>('user',userSchema);
export default user