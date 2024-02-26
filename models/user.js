import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username Invalid,it should contain 8-20 alphanumeric letters and be unique",
    ],
  },
  image: {
    type: String,
  },
  
});

// In next.js we have to give a condition to check if the model already exists which is checked by models.User
// if it exists then we use the existing model else we create a new model using model("User", userSchema)

export const User = models.User || model("User", userSchema);
