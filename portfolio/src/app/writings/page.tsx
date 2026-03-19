import Link from "next/link";
import { getAllWritings } from "@/lib/writings";

export default function WritingsPage() {
  const writings = getAllWritings();

  return (
    <div>
      <h1 style={{ marginBottom: "2.5rem", fontSize: "2.5rem", fontWeight: "600", textAlign: "center" }}>
        Writings
      </h1>

      {writings.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--muted)", marginTop: "2rem" }}>
          No writings yet. Add .md files to <code style={{ fontSize: "0.9em", padding: "0.2em 0.4em", backgroundColor: "#eee", borderRadius: "4px" }}>content/writings</code> to see them here.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {writings.map((writing) => (
            <li
              key={writing.slug}
              style={{
                padding: "1.25rem 0",
                borderBottom: "1px solid #eaeaea",
              }}
            >
              <Link
                href={`/writings/${writing.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  textDecoration: "none",
                  color: "var(--foreground)",
                  transition: "opacity 0.2s",
                }}
              >
                <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>{writing.title}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  {new Date(writing.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
