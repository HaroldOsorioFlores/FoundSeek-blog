import { IContent } from "@/lib/declarations";
import Image from "next/image";

export function ContentRenderer({ content }: Readonly<{ content: IContent }>) {
  switch (content.type) {
    case "paragraph":
      return <p>{content.text}</p>;
    case "heading":
      if (content.level === 2) return <h2 className="mt-7">{content.text}</h2>;
      if (content.level === 3) return <h3>{content.text}</h3>;
      if (content.level === 4) return <h4>{content.text}</h4>;
      if (content.level === 5) return <h5>{content.text}</h5>;
      if (content.level === 6) return <h6>{content.text}</h6>;
      break;
    case "code":
      return (
        <pre className="max-w-full overflow-auto">
          <code className="bg-gray-100 p-1 rounded text-sm font-mono ">
            {content.code}
          </code>
        </pre>
      );
    case "image":
      return (
        <Image
          alt={content.alt ?? ""}
          src={content.src ?? ""}
          width={content.width}
          height={content.height}
        />
      );
    case "richtext":
      return (
        <div
          dangerouslySetInnerHTML={{ __html: content.content ?? "" }}
          className="richtext"
        />
      );
    default:
      break;
  }
}
