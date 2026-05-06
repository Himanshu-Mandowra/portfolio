import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"

const registerUser = asyncHandler(async (req, res) => {
   // get user details from frontend  DONE
   // validation - not empty          Done
   // check if user already exists: username, email    Done
   // check for images, check for avatar
   // upload them to cludinary, avatar
   // create user object - create entry in db
   // remove password and refresh token field from response
   // check for user creation
   // return response 

   const { fullname, email, username, password } = req.body
   console.log("email:", email);

   if (
      [fullname, email, username, password].some((field) => field.trim() === "")

   ) {
      throw new ApiError(400, `${field} is required`)
   }
   const exsiteUser = User.findOne({
      $or: [{ email }, { username }]
   })

   if(exsiteUser){
      throw new ApiError(409, "User already exists this username or email");
   }

   const avatarLocalPath = req.files?.avatar[0]?.path
   console.log("Request File fron user controller:", req.files);
})
export { registerUser }