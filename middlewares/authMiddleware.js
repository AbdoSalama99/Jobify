import {
  UnauthenticatedError,
  BadRequestError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError('authentication invalid')

  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === '651abbdd21d45fd0985ebebe'
    req.user = { userId, role, testUser }
    next()
  } catch (err) {
    throw new UnauthenticatedError('authentication invalid')
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!')
  }
  next()
}
