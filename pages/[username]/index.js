import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { query as fireQuery, collection, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { getUserWithUsername, firestore, postToJSON } from '../../lib/firebase';


export async function getServerSideProps({ query }) {
    const { username } = query;

    const { userDoc } = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data(); // user data object to be passed as props (needed to render <UserProfile />)

        const uid = userDoc.id; // user uid needed to query a user's posts 
                                // here collection() with uid is replacing document.ref from v8 SDK
        const postQuery = fireQuery(collection(firestore, 'users', uid, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'), limit(5));
        posts = (await getDocs(postQuery)).docs.map(postToJSON)
    }



    return {
        props: { user, posts }, // is passed to the page as props
    };
}



export default function UserProfilePage({ user, posts }) {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    )
}