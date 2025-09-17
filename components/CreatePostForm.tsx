"use client"; // Add this line to mark this as a client component

import { useState } from "react";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = "";

    // If there's an image, upload it
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imageUrl = data.url; // Image URL returned from /api/upload
      setUploading(false);
    }

    // Create the post in the database (send post data + imageUrl to /api/posts)
    const postData = {
      title,
      content,
      imageUrl, // Include the uploaded image URL here
    };

    const postRes = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const postResult = await postRes.json();
    if (postResult.success) {
      alert("Post created successfully!");
    } else {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />

      <textarea
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-4"
        rows={5}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) setImageFile(e.target.files[0]);
        }}
        className="mb-4"
      />

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Create Post"}
      </button>
    </form>
  );
}
