import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { db, storage } from '../firebase'
import {
  collection,
  addDoc,
  Timestamp,
  FieldValue,
} from 'firebase/firestore/lite'
import {
  ref,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

function InputBox() {
  const { data: session } = useSession()
  const inputRef = useRef(null)
  const filePickerRef = useRef(null)

  // for showing the image on the page
  const [fileDataURL, setFileDataURL] = useState(null)

  // for uploading the image to firebase
  const [fileToPost, setFile] = useState(null)

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
      // 메시지 포스팅 완료 직후 파일 업로드
      .then((doc /* 포스트된 메시지 Document reference */) => {
        console.log('doc.id?', doc.id)

        if (fileToPost) {
          // create file metadata including the content type
          /** @type {any} */
          const metadata = {
            contentType: fileToPost.name,
          }

          // upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = ref(storage, 'posts/' + doc.id)
          const uploadTask = uploadBytesResumable(storageRef, fileToPost)

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              console.log('## snapshot', snapshot)

              // get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100

              console.log(`Upload is ${progress}% done`)
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
              }
            },
            (storageError) => {
              // a full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              // switch (error.code) {
              //   case 'storage/unauthorized':
              //     // User doesn't have permission to access the object
              //     break
              //   case 'storage/canceled':
              //     // User canceled the upload
              //     break

              //   // ...

              //   case 'storage/unknown':
              //     // Unknown error occurred, inspect error.serverResponse
              //     break
              // }

              alert(
                `storageError: image upload error has been occured. see below. ${JSON.stringify(
                  storageError,
                )}`,
              )
            },
            (complete) => {
              // upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                console.log(`File available at: ${downloadUrl}`)
              })
            },
          )
        }
      })
      .then(() => {
        removeImage()
      })

    inputRef.current.value = ''
  }

  /**
   * file picker를 통해 이미지 혹은 동영상 파일 선택시(onChange) 이벤트를 받아서 firestore에 파일을 업로드.
   */
  const addFileDataURL = (e) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    const reader = new FileReader()

    /* 상태 업로드 리스너 등록 */
    reader.onloadend = (e) => {
      setFile(file)
      setFileDataURL(e.target.result)
    }
    reader.onerror = (error) => {
      console.log('FileReader Error: ', error)
    }

    // base64로 인코딩
    reader.readAsDataURL(file)
  }

  const removeImage = () => setFileDataURL(null)

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
