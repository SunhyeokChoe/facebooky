import Image from 'next/image'

function Header() {
  return (
    <>
      <div>Header</div>

      {/* Left */}
      <div>
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
      </div>

      {/* Center */}

      {/* Right */}
    </>
  )
}

export default Header
