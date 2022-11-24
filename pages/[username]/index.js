import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { query, doc } from 'firebase/firestore'

export async function getServerSideProps({ query }) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        userDocRef = doc(firestore, )
        // 4:05 in video, turn v8 into v9 code
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