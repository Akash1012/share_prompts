"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const { data: session } = useSession();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=/${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete");
    if (hasConfirmed) {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPosts = async () => {
    const response = await fetch(`api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  return (
    <Profile
      name="MY"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
