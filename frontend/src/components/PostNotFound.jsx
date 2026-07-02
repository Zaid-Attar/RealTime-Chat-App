import React from 'react'
import { Link } from 'react-router'
import { FileEditIcon } from 'lucide-react'

const PostNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="card bg-base-100 shadow-sm border border-base-300 max-w-md w-full text-center">
        <div className="card-body items-center flex-col py-10">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <FileEditIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No blogs found</h2>
          <p className="text-base-content/70 mb-8">
            It looks a bit empty here. Why don't you start by sharing your first thought?
          </p>
          <Link to="/create" className="btn btn-primary w-full sm:w-auto">
            Create your first blog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostNotFound