import CreatePostForm from "@/components/CreatePostForm";
import Header from "@/components/Header";


export default function CreatePostPage() {
  return (
    <>      
     <Header />
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
      <CreatePostForm />  
    </div>
    </>
  );
}
