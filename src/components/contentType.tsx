import { IContent } from "@/lib/declarations";

export function ContentType({
  sectionArticle,
}: Readonly<{ sectionArticle: IContent }>) {
  switch (sectionArticle.type) {
    case "Paragraph":
      return <p>{sectionArticle.text}</p>;
    case "heading2":
      return <h2>{sectionArticle.text}</h2>;
    default:
      return null;
  }
}
