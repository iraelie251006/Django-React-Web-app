import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((error) => alert(error));
  };

  const deleteNote = (id) => {
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("Failed to delete note");
      })
      .catch((error) => alert(error));
    getNotes();
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note");
      })
      .catch((error) => alert(error));
    getNotes();
  };
  return <div className="flex flex-col justify-center items-center h-screen">
    <div className="rounded-lg shadow-2xl">
     <div>
      {notes.length > 0 && <h1 className="font-bold text-3xl flex items-center justify-center mx-10 my-5">Notes</h1>}
      {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}
  </div>
  {notes.length > 0 && <hr className="mb-5"/>}
  <h2 className="font-bold text-3xl flex items-center justify-center mx-10 my-5">Create a Note</h2>
  <form onSubmit={createNote} className="flex flex-col justify-center items-center mx-10 my-5">
      <label htmlFor="title" className="font-semibold">Title:</label>
      <br />
      <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border-2 rounded-lg p-2 w-96"
      />
      <br />
      <label htmlFor="content" className="font-semibold">Content:</label>
      <br />
      <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-2 rounded-lg p-2 w-96 h-40"
      ></textarea>
      <br />
      <input type="submit" value="Submit" className="w-96 p-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-700 transition duration-500 ease-in-out mb-5"></input>
  </form>   
    </div>
  
</div>;
};

export default Home;
