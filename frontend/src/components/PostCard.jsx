import { Trash, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'

const PostCard = ({ post, setPosts }) => {

  const handleDelete = async(e,id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter(p => p._id !== id));
      toast.success("Post Successfully Deleted!!");
    } catch (error) {
      toast.error("Failed to Delete the Post.");
    }
  }

  return (
    <Link to={`/posts/${post._id}`}
        className="card bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border-solid border-gray-700">
    <div className="card-body">
      <h3 className="card-title text-lg font-bold text-white">{post.title}</h3>
      <div className="text-sm text-gray-400 mb-2">By {post.author || 'Anonymous'}</div>
      <p className="text-gray-400 line-clamp-3">{post.content}</p>
      <div className="card-footer mt-4 text-sm text-gray-500">
        <span className="text-sm text-base-content/60 text-gray-500">{formatDate(new Date(post.createdAt))}</span>
        <div className="flex justify-end mt-2">
            <button className="btn btn-sm btn-ghost text-base ml-2">
              <PenSquareIcon className="size-5" />
            </button>
            <button className="btn btn-sm btn-ghost text-error ml-2" onClick={(e)=>handleDelete(e,post._id)}>
                <Trash2Icon className="size-5" />
            </button>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default PostCard