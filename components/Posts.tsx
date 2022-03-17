import React, { useState, useEffect, useMemo } from 'react'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  doc,
  getDocs,
  DocumentData,
} from 'firebase/firestore/lite'
import { db } from '../firebase'
import { useCollection } from '@hooks/firebase/firestore/useCollection'
import Post from './Post'

const Posts: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const postsRef = await getDocs(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      )

      setPosts(postsRef)
    })()
  }, [])

  useEffect(() => {
    console.log('posts:', posts)
  }, [posts])

  // const postsCollection = useMemo(
  //   () =>
  //     getDocs(
  //       query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
  //     ),
  //   [],
  // )

  // const [realtimePosts, loading, error] = useCollection(posts, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // })

  return (
    <div>
      {posts?.docs.map((post) => {
        console.log(post.data())

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
