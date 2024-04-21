import Axios from "@repo/utils/axios";
export default async function LoginPage() {
  const res = await Axios<{title: string; body: string}[]>('https://jsonplaceholder.typicode.com/posts');
  return (
    <>
      {res.data.map(post => <div>
        {post.body}
      </div> )}
    </>
  );
}
