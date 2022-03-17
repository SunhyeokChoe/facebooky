import React from 'react'

type IProps = {
  name: string
  message: String
  email: string
  timestamp: Date
  image: string
  postImage: string
}

const Post: React.FC<IProps> = ({
  name,
  message,
  email,
  timestamp,
  image,
  postImage,
}): JSX.Element => {
  return (
    <div>
      <h1>{name}</h1>
      <h1>{message}</h1>
      <h1>{email}</h1>
      {/* <h1>{timestamp}</h1> */}
      <h1>{image}</h1>
      <h1>{postImage}</h1>
    </div>
  )
}

export default Post
