import React from 'react'
import Image from 'next/image'

type IProps = {
  name: string
  message: String
  email: string
  timestamp: any
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
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex space-x-2">
          <img
            className="rounded-full"
            src={image}
            alt="image"
            width={40}
            height={40}
          />
          <div>
            <p className="font-medium ">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="pt-4">{message}</p>
      </div>

      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}
    </div>
  )
}

export default Post
