import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postid')({
  component: RouteComponent,
});

const fetchPostById = async (postid: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`);
  return res.json();
}

function RouteComponent() {
  const { postid } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['posts', postid],
    queryFn: () => fetchPostById(postid)
  });


  if (isLoading) return <h1 className='text-center'>Loading</h1>


  const { id, title, body } = data || { id: "-", title: "-", body: "-" }

  console.log(postid, data)

  return (
    <div className='flex items-center justify-center gap-2 flex-col mt-3 bg-blue-800 text-white p-2 rounded w-full'>
      <div key={id} className='border border-gray-200 bg-blue-800 text-white p-2 rounded w-4xl space-y-4'>
        <p className='text-sm font-sm text-gray-200'>Id : {id}</p>
        <p className='text-xl font-semibold mb-2' >{title}</p>
        <p className='text-md font-sm text-gray-300' >{body}</p>
      </div>


    </div>
  )

}
