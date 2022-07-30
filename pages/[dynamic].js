import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link';

const DynamicRoute = () => {
  const router = useRouter();
  const query = router.query.dynamic

  return (
    <>
    <Head>
      <title>{query}</title>
    </Head>
      <Link href='/'>
        <a>Back to home</a>
      </Link>
      <div>Hello I am a dynamic route: {query}</div>
    </>
  )
}

export default DynamicRoute;
