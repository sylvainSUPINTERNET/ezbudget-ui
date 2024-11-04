import { Link } from "./components/Link";
import { cookies } from 'next/headers';

export default async function Home() {

  // Only works using server side component ( https only )
  const cookieStore = await cookies();
  console.log("???",cookieStore.get('access_token_link')?.value);

  return (
    <div className="">
      <Link></Link>
    </div>
  );
}
