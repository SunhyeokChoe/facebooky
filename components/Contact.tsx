import Image from 'next/image'
import React from 'react'

interface IProps {
  src: string
  name: string
}

const Contact: React.FC<IProps> = (props): JSX.Element => {
  const { src, name } = props

  return (
    <div
      className="flex items-center space-x-3 mb-2
    relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl"
    >
      <Image
        className="rounded-full"
        objectFit="cover"
        src={src}
        width={50}
        height={50}
        layout="fixed"
      />
      <p>{name}</p>
      <div
        className="absolute bottom-2 left-7 h-3 w-3
      bg-green-400 rounded-full animate-bounce"
      ></div>
    </div>
  )
}

export default Contact
