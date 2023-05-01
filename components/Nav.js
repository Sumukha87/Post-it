import Link from 'next/link';
import {auth} from '../utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";



export default function Nav(){
    const [user, loading] = useAuthState(auth);

    return(
        <nav className='flex justify-between items-center py-10'>
            <Link href="/">

            <button className='text-lg font-medium '>
                Post it Out -By S Srisumukha

            </button>
            </Link>
            <ul className='flex items-center gap-10'>
                {!user && (
                <Link href={'/auth/login'} className='py-2 px-4 text-sm bg-gray-700 text-white rounded-lg font-medium ml-8'>
                    join now
                </Link>
                )}
                {user && (
                    <div className='flex items-center gap-6 '>
                        <Link href="/post">
                        <button className='font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg textx-sm'>Post</button>
                        </Link>
                        <Link href="dashbord">
                            <img className='w-12 rounded-full cursor-pointer' src={user.photoURL}  />
                            
                        </Link>
                        <Link href="dashbord"><h3 className='font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg textx-sm'>Dashboard</h3></Link>
                    </div>
                )}
            </ul>

        </nav>
    );
}