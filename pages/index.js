import styles from '../styles/Home.module.css'

import { useState } from 'react';
import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';

import { query, collectionGroup, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';


const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = query(collectionGroup(firestore, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'), limit(LIMIT));
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts } // passed to the page as props
  }
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    const last = posts[posts.length - 1];
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const newPostsQuery = query(collectionGroup(firestore, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'), startAfter(cursor), limit(LIMIT));
    const newPosts = (await getDocs(newPostsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end'}
    </main>
  )
}
