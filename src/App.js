import { useState } from "react";

let controller, signal;
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const search = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value?.trim()) {
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
      signal = controller.signal;

      fetch("http://localhost:4000/animals?q=" + value, {
        signal: signal,
      })
        .then((response) => response.json())
        .then((data) => console.log("Results for " + value, data))
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        name="search"
        onChange={search}
        placeholder="Type query..."
        value={searchTerm}
      />
    </div>
  );
}

export default App;
