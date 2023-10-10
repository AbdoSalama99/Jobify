import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Job from './models/JobModel.js'
import User from './models/UserModel.js'

try {
  // Establish MongoDB Connection
  await mongoose.connect(process.env.MONGO_URL)

  // Find User
  const user = await User.findOne({ email: 'test@test.com' })
  // const user = await User.findOne({
  //   email: 'abdelmonagi31009699@f-eng.tanta.edu.eg',
  // })

  // Read and Parse JSON Data
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  )

  // Map and Modify Job Objects
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })

  // Delete Existing Jobs and Create New Jobs
  await Job.deleteMany({ createdBy: user._id })
  await Job.create(jobs)

  // Success Message
  console.log('Success!!!')

  // Exit the Process
  process.exit(0)
} catch (error) {
  // Error Handling
  console.log(error)
  process.exit(1)
}
