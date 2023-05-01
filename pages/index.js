import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Message from '@/components/message'
import { useEffect,useState } from 'react'
import { db } from '@/utils/firebase'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [allPosts, setAllPosts] = useState([]);


  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
   
    <div>
      
      <Head>
        <title>
          Post-it-out-S Srisumukha
        </title>
       
      </Head>

      <div className='my-12 txx-lg font-medium'>
        <h2 className='text-center my-5	' >See what other people are thinking</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button className='bg-gray-600 text-white px-3 py-2 rounded-xl'>
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
   
    

 
  )
}
