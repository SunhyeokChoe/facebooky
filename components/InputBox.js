import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { db, storage } from '../firebase'
import {
  collection,
  doc,
  addDoc,
  setDoc,
  Timestamp,
  FieldValue,
} from 'firebase/firestore/lite'
import { ref, getDownloadURL } from 'firebase/storage'
import { useUploadFile } from '@hooks/firebase/storage'

function InputBox() {
  const { data: session } = useSession()
  const inputRef = useRef(null)
  const filePickerRef = useRef(null)

  // useUploadFile hook 호출
  const [uploadFile, uploading, snapshot, error] = useUploadFile()

  // 컴포넌트에 보여줄 이미지의 base64 string
  const [fileDataURL, setFileDataURL] = useState(null)

  // for uploading the image to firebase
  // firebase storage에 업로드 할 이미지의 bytes
  const [fileToPost, setFileToPost] = useState(null)

  const uploadToFirebaseStorage = async (storageRef) => {
    if (fileToPost) {
      // const filename = fileToPost.name
      //   .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, '')
      //   .split(' ')
      //   .join('')

      return await uploadFile(storageRef, fileToPost, {
        // create file metadata including the content type
        /** @type {any} */
        contentType: fileToPost.type,
      })
    }
  }

  const sendPost = async (e) => {
    e.preventDefault()

    if (!inputRef.current.value) return

    addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: Timestamp.now(),
    })
      // firestore에 메시지 포스팅 완료 직후 파일을 firestorage에 동일한 doc.id로 업로드
      .then(async (doc /* 포스팅 완료된 메시지 Document reference */) => {
        if (fileToPost) {
          // upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = ref(storage, 'posts/' + doc.id)

          return await uploadToFirebaseStorage(storageRef)
        }
      })
      .then((response) => {
        // clear input(type="file")
        removeImage()

        // clear input(type="text")
        inputRef.current.value = ''

        return response
      })
      .then(async ({ metadata, ref: storageRef }) => {
        console.log('{ metadata, storageRef }:', { metadata, storageRef })

        // return await getDownloadURL(storageRef)

        return await getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log('posts/' + metadata.name)

          await setDoc(
            doc(collection(db, 'posts'), metadata.name),
            { postImage: downloadUrl },
            { merge: true },
          )
        })
      })
      // .then(async (downloadUrl) => {
      //   console.log('posts/' + metadata.name)

      //   return await setDoc(
      //     doc(collection(db, 'posts/' + metadata.name)),
      //     { postImage: downloadUrl },
      //     { merge: true },
      //   )
      // })
      .then(() => {
        console.log('successfully uploaded')
      })
      .catch((error) => {
        // TODO: 데이터 삭제
      })
  }

  /**
   * file picker를 통해 이미지 혹은 동영상 파일 선택시(onChange) 이벤트를 받아서 firestore에 파일을 업로드.
   */
  const addFileDataURL = (e) => {
    if (!e.target.files) return

    console.log('e.target.files', e.target.files)

    const file = e.target.files[0]
    const reader = new FileReader()

    /* 상태 업로드 리스너 등록 */
    reader.onloadend = (e) => {
      setFileToPost(file)
      setFileDataURL(e.target.result)
    }
    reader.onerror = (error) => {
      console.log('FileReader Error: ', error)
    }

    // base64로 인코딩
    reader.readAsDataURL(file)
  }

  /**
   * file picker, input(type="file") 그리고 관련 state 초기화
   */
  const removeImage = () => {
    setFileToPost(null)
    setFileDataURL(null)

    /**
     * onChange 이벤트는 새로운 이미지 선택시에만 발생하므로
     * 이미지 선택을 취소 후 다시 동일한 이미지 선택 했을 경우 이벤트가 발생하지 않는다.
     * 따라서 input(type="file") ref의 current.value 값을 초기화 해주어 동일 파일을
     * 선택해도 이벤트를 발생시킬 수 있도록 한다.
     */
    filePickerRef.current.value = ''
  }

  return (
    <div className="bg-white mt-6 p-2 rounded-2xl shadow-md text-gray-500 font-medium">
      <div className="flex items-center space-x-4 p-4">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {fileDataURL && (
          <div
            onClick={removeImage}
            className="
            flex flex-col
            filter hover:brightness-110
            transition duration-150
            transform hover:scale-105
            cursor-pointer"
          >
            <img className="h-10 object-contain" src={fileDataURL} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p
            className="
            text-xs
            sm:text-sm
            xl:text-base"
          >
            Live Video
          </p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p
            className="
            text-xs
            sm:text-sm
            xl:text-base"
          >
            Photo/Video
          </p>
          <input
            ref={filePickerRef}
            onChange={addFileDataURL}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p
            className="
            text-xs
            sm:text-sm
            xl:text-base"
          >
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
