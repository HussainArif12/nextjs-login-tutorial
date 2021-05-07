import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
export default function Home() {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <div>
      {loading && <p>Loading..</p>}
      {!session && (
        <>
          Not signed in <br />
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      <Link href="/dashboard">
        <a>Go to dashboard</a>
      </Link>
    </div>
  );
}
