import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,

})

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};


function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
  console.log(data)

  if (isLoading) return "Loading";
  if (error) return "Error";
  if (!data) return "No Data";
  return (

    <>
      <div className='flex items-center justify-center gap-2 flex-col mt-3'>
        {data?.map((post: { id: number, userId: number, title: string, body: string }) => (
          <div key={post.id} className='border border-gray-200 bg-blue-800 text-white p-2 rounded w-4xl space-y-4'>
            <p className='text-sm font-sm text-gray-200'>Id : {post.id}</p>
            <p className='text-xl font-semibold mb-2' >{post.title}</p>
            <p className='text-md font-sm text-gray-300' >{post.body}</p>
            <Link to="/posts/$postid" params={{ postid: String(post.id) }}>
              <button className='bg-green-500 p-2 rounded text-white cursor-pointer'>View Post</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
