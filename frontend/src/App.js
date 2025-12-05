import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then(r => r.json())
      .then(setTodos)
      .catch(() => setTodos([]));
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!text) return;
    const body = { text };
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const json = await res.json();
      setTodos(prev => [...prev, json.todo]);
      setText("");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Azure TODO App</h1>
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New task" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.length === 0 && <li>No tasks yet</li>}
        {todos.map((t, i) => <li key={i}>{t.text || JSON.stringify(t)}</li>)}
      </ul>
    </div>
  );
}
