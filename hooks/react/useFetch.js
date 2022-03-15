import { useState, useEffect } from 'react'
// import axios from 'axios'

export default (url) => {
  const [payload, setPayload] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({})

  // const callUrl = async () => {
  //   try {
  //     const { data } = await axios.get(url)
  //     setPayload(data)
  //   } catch (error) {
  //     setError(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   callUrl()
  // }, [])

  return { payload, loading, error }
}
