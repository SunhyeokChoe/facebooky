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
  return <div></div>
}

export default Post
