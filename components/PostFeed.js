import Link from 'next/link';

export default function PostFeed({ posts, admin }) {
    return posts ? posts.map((post) => <PostItem key={post.slug} post={post} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {

    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    return (
        <div className="card">
            <Link href={`/${post.username}`}>
                    <strong>By @{post.username}</strong>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <p>{post.title}</p>
                </h2>
            </Link>

            <footer>
                <span>
                    {wordCount} words. {minutesToRead} min read
                </span>
                <span className="push-left"> {post.heartCount} Hearts</span>
            </footer>

        </div>
    );
}