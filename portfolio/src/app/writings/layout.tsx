import { Source_Serif_4 } from "next/font/google";

const readingSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-reading",
  display: "swap",
});

export default function WritingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`writings-reading-root ${readingSerif.variable}`}>
      {children}
    </div>
  );
}
