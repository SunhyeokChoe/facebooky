import Stories from './Stories'
import InputBox from './InputBox'

function Feed() {
  return (
    <div
      className="
        flex-grow h-screen pb-44 pt-6 mr-4 overflow-y-auto
        xl:mr-40"
    >
      <div
        className="
        mx-auto max-w-md
        md:max-w-lg
        lg:max-w-2xl"
      >
        <Stories />

        {/* <InputBox /> */}

        {/* <Posts /> */}
      </div>
    </div>
  )
}

export default Feed
