import { useRouter } from "next/router";

export default function Update({ data }) {
  const router = useRouter();
  const { id } = router.query;

  const updateNote = async (event) => {
    event.preventDefault();

    const res = await fetch(`/api/notes/update/${id}`, {
      body: JSON.stringify({
        title: event.target.title.value,
        body: event.target.body.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    router.push("/dashboard");
  };

  return (
    <div>
      {data.error ? (
        <p>{data.error}</p>
      ) : (
        <form onSubmit={updateNote}>
          <label htmlFor="name">Name</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={data.note.title}
            autoComplete="name"
          />
          <input
            id="body"
            name="body"
            type="text"
            defaultValue={data.note.body}
            autoComplete="false"
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const hostname = "http://localhost:3000";
  const options = { headers: { cookie: context.req.headers.cookie } };
  const res = await fetch(
    `${hostname}/api/notes/update/${context.params.id}`,
    options
  );
  const json = await res.json();

  return {
    props: {
      data: json,
    },
  };
}
