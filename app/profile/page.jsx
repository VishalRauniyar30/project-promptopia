"use client";

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {
    const router = useRouter();
    const { data : session } = useSession();
    const [allPosts, setAllPosts] = useState([]);


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method : 'DELETE'
                });

                const filteredPost = allPosts.filter((p) => p._id != post._id);
                setAllPosts(filteredPost);
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
            setAllPosts(data);
        };
        if(session?.user.id){
            fetchPosts();
        } 
    }, [session?.user.id]);

    
    return (
        <Profile 
            name='My'
            desc='Welcome to your Personalized Profile Page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={allPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;