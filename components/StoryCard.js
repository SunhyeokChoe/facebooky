import Image from 'next/image'

function StoryCard({ name, src, profile }) {
  return (
    <div
      className="
        relative h-14 w-14
        cursor-pointer overflow-x p-3
        transition ease-in duration-200
        transform hover:scale-105 hover:animate-pulse
        md:h-20 md:w-20
        lg:h-56 lg:w-32"
    >
      {/* by default: 모바일 사이즈에서 opacity: 0, 큰 스크린에서는 opacity: 100 */}
      <Image
        className="absolute opacity-0 lg:opacity-100
        rounded-full z-50 top-10"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />
      <Image
        className="filter brightness-75
        rounded-full lg:rounded-3xl"
        src={src}
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

export default StoryCard
