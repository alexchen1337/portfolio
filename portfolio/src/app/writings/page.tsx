import Link from "next/link";
import { getAllWritings } from "@/lib/writings";

export default function WritingsPage() {
  const writings = getAllWritings();

  return (
    <div className="copy-body">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <span className="section-label" style={{ paddingBottom: '16px' }}>// yapping</span>
        {writings.length === 0 ? (
          <p style={{ color: "var(--dim)" }}>no writings yet.</p>
        ) : (
          writings.map((writing) => (
            <Link
              key={writing.slug}
              href={`/writings/${writing.slug}`}
              className="writing-row writing-row--list"
              style={{
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            >
              <span>{writing.title}</span>
              <span className="list-meta" style={{ color: "var(--dim)", flexShrink: 0, marginLeft: "16px" }}>
                {new Date(writing.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }).toLowerCase()}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
