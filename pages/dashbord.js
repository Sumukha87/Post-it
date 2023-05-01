import {auth,db} from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";
import Message from "../components/message";

import Link from "next/link";


export default function Dashboard(){
    const route=useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    return unsubscribe;
    };

    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
      };

    useEffect(() => {
        getData();
      }, [user, loading]);


    return(
        <div>
            <h1 className='my-5 text-bold'>
                Your Post
            </h1>
            <div>{posts.map((post)=>{
                return(
                <Message {...post} key={post.id}>
                    <div className='flex gap-6 '>
                        <button onClick={()=>deletePost(post.id)} className='bg-red-600 text-white rounded-lg py-1 px-1 text-xs'>Delete</button>
                       <Link href={{pathname:'/post',query:post}}> <button className='bg-gray-600 text-white rounded-lg py-1 px-1 text-xs'>Edit</button></Link>
                    </div>
                </Message>);
            })}</div>
            <button className="flex items-center gap-10 rounded-2xl font-medium text-white bg-gray-800 py-2 px-4 my-6" onClick={()=>auth.signOut()}>Sign Out</button>
        </div>
    )
}