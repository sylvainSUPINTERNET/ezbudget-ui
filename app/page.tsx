import { LinkLogin } from "./components/LinkLogin";
import { cookies } from 'next/headers';

export default async function Home() {

  // Only works using server side component ( https only )
  const cookieStore = await cookies();
  console.log("???",cookieStore.get('access_token_link')?.value);

  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()

  return (
    <div className="">
      <LinkLogin data={posts}></LinkLogin>
    </div>
  );
}
