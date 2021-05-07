import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
export default function Add() {
  const router = useRouter();
  const [session, loading] = useSession();

  const addNote = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/notes/add", {
      body: JSON.stringify({
        title: event.target.title.value,
        body: event.target.body.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    router.push("/dashboard");
  };
  return (
    <div>
      {loading && <p>Loading..</p>}
      {session ? (
        <form onSubmit={addNote}>
          <label htmlFor="name">Name</label>
          <input id="title" name="title" type="text" autoComplete="name" />
          <input id="body" name="body" type="text" autoComplete="false" />
          <button type="submit">Add</button>
        </form>
      ) : (
        <p>Not logged in to view this resource</p>
      )}
    </div>
  );
}
