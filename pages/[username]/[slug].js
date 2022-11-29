import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, collectionGroup, doc, getDoc, getDocs, query } from 'firebase/firestore';

export async function getStaticProps({ params }) {
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let post;
    let path;

    if (userDoc) {
        const postRef = doc(firestore, 'users', userDoc.id, 'posts', slug)
        post = postToJSON(await getDoc(postRef));

        path = postRef.path
    }

    return {
        props: { post, path },
        revalidate: 5000,
    }
};

export async function getStaticPaths() {
    const snapshot = await getDocs(query(collectionGroup(firestore, 'posts')));
    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
            params: { username, slug }
        }
    });

    return {
        // returns-
        // paths = [
        //     { slug, username }
        // ]
        paths,
        fallback: 'blocking',
    }
}

export default function PostPage({ }) {
    return (
        <main>
            <h1>Post page</h1>
        </main>
    )
}