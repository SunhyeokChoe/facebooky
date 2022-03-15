// import {
//   useState,
//   useCallback,
//   ChangeEvent,
//   Dispatch,
//   SetStateAction,
// } from 'react'

// type ReturnTypes<S> = [
//   S,
//   S,
//   (e: ChangeEvent) => void,
//   Boolean,
//   typeof useCallback,
//   Dispatch<SetStateAction<S>>,
// ]

// /**
//  * @param {S} initialValues
//  * @param {S} initialValues
// //  * @returns {[string, (e: React.ChangeEvent<HTMLInputElement>) => void]}
//  */
// export default <S = any>(
//   initialValues: S,
//   onSubmit,
//   validate,
// ): ReturnTypes<S> => {
//   const [values, setValues] = useState(initialValues)
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleChange = useCallback(
//     (name) => (e: ChangeEvent<HTMLInputElement>) => {
//       setValues({
//         ...values,
//         [name]: e.target.value,
//       })
//     },
//     [values],
//   )

//   const handleSubmit = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       e.preventDefault()
//       const newErrors = validate(values)
//       setErrors(newErrors)
//       setIsSubmitting(true)
//     },
//     [values],
//   )

//   return {
//     values,
//     errors,
//     isSubmitting,
//     handleChange,
//     handleSubmit,
//   }

//   // 튜플 타입 배열로 freeze
//   // return [values, errors, isSubmitting, handleChange, handleSubmit] as const
// }

export {}
