import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState({ content: "" });
  const [notesList, setNotesList] = useState(() => {
    const data = localStorage.getItem("notesList");
    const savedNotes = JSON.parse(data);

    return savedNotes || [];
  });

  useEffect(() => {
    localStorage.setItem("notesList", JSON.stringify(notesList));
  }, [notesList]);

  const handleAdd = () => {
    if (!notes.content) return;
    setNotesList([...notesList, notes]);
    setNotes({});
  };

  const handleDelete = (id) => {
    console.log("Deleting note with id:", id);
    setNotesList(notesList.filter((note) => note.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "white" }}>Catatan Harian Dedy</h1>
      <div style={{ height: "50px", display: "flex" }}>
        <input
          className="Input"
          value={notes.content || ""}
          onChange={(e) =>
            setNotes({ id: Date.now(), content: e.target.value })
          }
          placeholder="Tulis Catatan..."
          style={{ width: "50%" }}
        />
        <button className="Button" onClick={handleAdd}>
          Tambah
        </button>
      </div>

      <h2 style={{ color: "white" }}>Daftar Catatan</h2>
      <ul style={{ color: "white" }}>
        {notesList.map((note, idx) => (
          <li key={idx}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{note.content}</p>
              <button
                className="DeleteButton"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
