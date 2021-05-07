import Link from "next/link";
import { useRouter } from "next/router";

export default function Note({ id, title }) {
  const router = useRouter();

  const sendDelete = async () => {
    const res = await fetch(`/api/notes/delete/${id}`, {
      method: "DELETE",
    });
    router.push("/dashboard");
  };

  return (
    <div>
      <Link href={`/notes/${id}`}>
        <a>
          {" "}
          <h1>{title}</h1>
        </a>
      </Link>
      <button>
        <Link href={`/notes/update/${id}`}>Update</Link>
      </button>
      <button onClick={() => sendDelete()}>Delete</button>
    </div>
  );
}
