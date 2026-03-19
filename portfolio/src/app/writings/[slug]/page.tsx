import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getWritingBySlug, getAllWritings } from "@/lib/writings";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const writings = getAllWritings();
  return writings.map((w) => ({ slug: w.slug }));
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing) {
    notFound();
  }

  return (
    <article>
      <Link
        href="/writings"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          marginBottom: "2rem",
          color: "var(--muted)",
          fontSize: "0.9rem",
          textDecoration: "none",
        }}
        className="writings-back-link"
      >
        ← Back to writings
      </Link>

      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.5rem", fontSize: "2.25rem", fontWeight: "600" }}>{writing.title}</h1>
        <time
          style={{ fontSize: "0.9rem", color: "var(--muted)" }}
          dateTime={writing.date}
        >
          {new Date(writing.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <div className="writings-markdown">
        <ReactMarkdown>{writing.content}</ReactMarkdown>
      </div>
    </article>
  );
}
