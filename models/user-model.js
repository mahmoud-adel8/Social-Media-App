import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'available'
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

const UserModel = model('User', userSchema);

export default UserModel;