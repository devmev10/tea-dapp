export default function Buy({ state }) {
  async function buyChai() {}

  return (
    <div>
      <form onSubmit={buyChai}>
        <label>
          {" "}
          Name:
          <input type="text" placeholder="Enter your name" />
        </label>
      </form>
    </div>
  );
}
