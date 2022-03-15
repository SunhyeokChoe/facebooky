import { useState, useCallback } from 'react'

export default (initialValues) => {
  const [value, setValue] = useState(initialValues)

  const onChange = useCallback((e) => {
    const {
      target: { value },
    } = e
    setValue(value)
  }, [])

  return { value, onChange }
}
