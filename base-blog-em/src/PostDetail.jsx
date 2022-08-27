import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicoddde.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, error, isError, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation(() => updatePost(post.id));

  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h1>L L L L L</h1>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>{" "}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error id deleting post {post.id}</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>deleting post {post.id}...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>post {post.id} (not) deleted!</p>
      )}
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error in updating post {post.id}</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>updating post {post.id}...</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>post {post.id} (not) updated!</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
