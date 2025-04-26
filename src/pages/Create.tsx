import React from 'react'
import PostForm from '../components/PostForm'
import { FileImage } from 'lucide-react'

function Create() {
  return (
<div className="container mt-4">
  <div className="d-flex">
    <div className="w-100">
      <div className="d-flex gap-3 align-items-center mb-4">
        <FileImage height={30} width={30}/>
       
        <h2 className="h3 m-0">Create Post</h2>
      </div>

      <PostForm action="Create" />
    </div>
  </div>
</div>
  )
}

export default Create
