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
    <article className="writings-article">
      <header className="writings-article__header">
        <h1 className="writings-article__title">{writing.title}</h1>
        <time className="writings-article__date" dateTime={writing.date}>
          {new Date(writing.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).toLowerCase()}
        </time>
      </header>

      <div className="writings-markdown">
        <ReactMarkdown>{writing.content}</ReactMarkdown>
      </div>
    </article>
  );
}
