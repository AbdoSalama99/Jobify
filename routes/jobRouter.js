import { Router } from 'express'
import {
  validateJobInput,
  validateIdParam,
} from '../middlewares/validationMiddleware.js'

import { checkForTestUser } from '../middlewares/authMiddleware.js'
const router = Router()

import {
  getAllJobs,
  createJob,
  getSingelJob,
  editJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js'

// GET ALL JOBS
router.get('/', getAllJobs)

// CREATE JOB
router.post('/', checkForTestUser, validateJobInput, createJob)

// showStats
router.get('/stats', showStats)

//get singel job
router.get('/:id', validateIdParam, getSingelJob)

//edit job
router.patch('/:id', checkForTestUser, validateIdParam, editJob)

//DELETE JOB
router.delete('/:id', checkForTestUser, validateIdParam, deleteJob)

export default router
