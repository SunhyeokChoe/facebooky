import * as React from 'react'
import { collection, query, orderBy } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore/lite'
// import { firebaseApp } from '../firebase'
import { db } from '../firebase'
import { useCollection } from '@hooks/firebase/firestore/useCollection'
import Post from './Post.tsx'

const Posts: React.FC = (): JSX.Element => {
  const [realtimePosts] = useCollection(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
  )

  return (
    <div>
      {realtimePosts?.docs.map((post) => {
        return (
          <Post
            key={post.id}
            name={post.data().name}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timestamp}
            image={post.data().image}
            postImage={post.data().postImage}
          />
        )
      })}
    </div>
  )
}

export default Posts
