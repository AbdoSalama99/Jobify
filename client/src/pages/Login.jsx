import React from 'react'
import {
  Link,
  useNavigation,
  redirect,
  Form,
  useNavigate,
} from 'react-router-dom'
import { FormRow, Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const Login = () => {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isSubmitting = navigation.state === 'submitting'
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('take a test drive')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <Wrapper>
      <Form className='form' method='post'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' labelText='Email' name='email' />
        <FormRow type='password' labelText='Password' name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
