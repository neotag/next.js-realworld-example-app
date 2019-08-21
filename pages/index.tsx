import Link from 'next/Link'

const Home = () => {
  return <div>
    <p>Welcome to Next.js!</p>
    <p><Link href="/register"><a>Sign in / Sign up</a></Link></p>
  </div>
}

export default Home
