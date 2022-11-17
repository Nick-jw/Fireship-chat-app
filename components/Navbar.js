import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function NavBar() {
    
    const { user, username } = useContext(UserContext);

    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href='/'>
                        <button className="btn-logo">Feed</button>
                    </Link>
                </li>

                {/* user is signed in and thus has a username */}
                {username && (
                    <>
                        <li>
                            <Link href='/admin'>
                                <button className='btn-blue'>Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                    </>
                )}

                {/* user is not signed in and thus has no username */}
                {!username && (
                    <>
                        <li>
                            <Link href='/enter'>
                                <button className='btn-blue'>Log in</button>
                            </Link>
                        </li>
                    </>
                )}  
            </ul>
        </nav>
    )
}