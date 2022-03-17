import React from 'react'
import Image from 'next/image'
import { ThumbUpIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline'

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
        {/* Header */}
        <div className="flex space-x-2">
          <img
            className="rounded-full"
            src={image}
            alt="profile image"
            width={40}
            height={40}
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="pt-4">{message}</p>
      </div>

      {/* Body: image */}
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}

      <div
        className="flex justify-between item-center rounded-b-2xl bg-white
        shadow-md text-gray-400 border-t pl-2 pr-2"
      >
        <div className="inputIcon rounded-none rounded-bl-2xl">
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>

        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>

        <div className="inputIcon rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
      </div>
    </div>
  )
}

export default Post
