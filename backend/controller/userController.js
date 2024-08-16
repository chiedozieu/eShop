import express from 'express'
import path from 'path'
import { upload } from '../multer.js';
import userModel from '../model/userModel.js';
import { errorHandler } from '../utils/errorHandler.js';


export const createUser = async (req, res, next) => {
    const {name, email, password} = req.body
    const userEmail = await userModel.findOne({email})
    if(userEmail){
        return next(errorHandler(400, 'User already exists'));
    }
    const filename = req.file.filename
    const fileUrl = path.join(filename);

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    }
 const newUser = await userModel.create(user);
 res.status(201).json({
    success: true,
    newUser
 })
}