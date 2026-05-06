import React, { useEffect, useState, useCallback } from "react";
import Character from "./Character";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCharacters = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character`,
        {
          params: {
            page,
            status: status || undefined,
            name: name || undefined,
          },
        }
      );

      setCharacters(res.data.results);
      setPageCount(res.data.info?.pages || 1);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setCharacters([]);
        setError("No characters found for the selected filters.");
      } else {
        setCharacters([]);
        setError("Failed to load characters. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [page, status, name]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick & Morty Characters</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setPage(1);
            setPageCount(1);
          }}
          style={{ padding: "8px", minWidth: "200px" }}
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
            setPageCount(1);
          }}
          style={{ padding: "8px" }}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}

      <div style={styles.grid}>
        {characters.map((char) => (
          <Character key={char.id} character={char} />
        ))}
      </div>

      {!loading && !characters.length && !error && <p>No characters available.</p>}

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        <span>
          Page {page} of {pageCount}
        </span>

        <button disabled={page >= pageCount} onClick={() => setPage((p) => Math.min(p + 1, pageCount))}>
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
};