// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const hospApi = createApi({
  reducerPath: 'hospApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/hospitals' }),
  endpoints: (builder) => ({
    getAllHospitals: builder.query({
      query: () => ``,
    }),
    getHospitalDetailsById: builder.query({
      query: (id) => `/${id}`,
    }),
    addHospital: builder.mutation({
      query:(newHosp)=>{
        return {
          url:``,
          method:'POST',
          body:newHosp
        }
      }
    }),
    addBeds:builder.mutation({
      query:(details)=>{
        console.log(details)
        return {
          url:`/${details.id}`,
          method:'PUT',
          body:details
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetAllHospitalsQuery,
    useAddHospitalMutation,
    useAddBedsMutation,
    useGetHospitalDetailsByIdQuery,
    useLazyGetAllHospitalsQuery,
    useLazyGetHospitalDetailsByIdQuery
 } = hospApi
