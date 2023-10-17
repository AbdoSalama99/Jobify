import React from 'react'
import FormRow from '../components/Form-row'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import {
  useOutletContext,
  Form,
  useNavigation,
  redirect,
} from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import FormRowSelect from '../components/FormRowSelect'
import { toast } from 'react-toastify'
import customFetch from '../../../utils/customFetch'

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/jobs', data)
      toast.success('job created successfuly')
      queryClient.invalidateQueries(['jobs'])
      return redirect('all-jobs')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error
    }
  }
const AddJob = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const { user } = useOutletContext()
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>
        <div className='form-center'>
          <FormRow name='position' type='text' />
          <FormRow name='company' type='text' />
          <FormRow
            name='jobLocation'
            type='text'
            labelText='job location'
            defaultValue={user.location}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />

          <FormRowSelect
            name='jobType'
            labelText='job type'
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob
