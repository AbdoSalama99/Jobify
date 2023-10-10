import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

export const getCurrentUser = async (req, res) => {
  console.log(req.user)
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res
    .status(StatusCodes.OK)
    .json({ msg: 'get current user', user: userWithoutPassword })
}

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ jobs, users })
}

export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path)
    fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }
  const oldUser = await User.findByIdAndUpdate(req.user.userId, newUser)

  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' })
}