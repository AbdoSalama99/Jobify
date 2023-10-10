import React, { createContext, useContext } from 'react'
import { SearchContainer, JobContainer } from '../components'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    const { data } = await customFetch.get('/jobs', { params })
    // this blew format to extract array with jobs only

    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobsContext = createContext()
const AllJobs = () => {
  const { data, searchValues } = useLoaderData()

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs
