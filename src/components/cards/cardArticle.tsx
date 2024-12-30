import Link from "next/link";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IArticle } from "@/lib/declarations";

export function CardArticle({ post }: Readonly<{ post: IArticle }>) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 max-w-96 w-full">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 space-x-1 ">
          {post.categories.map((categoryArticle) => (
            <span key={categoryArticle.id + categoryArticle.name}>
              {categoryArticle.name}
            </span>
          ))}
        </p>
        <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="default" asChild>
          <Link
            href={`/post/${post.slug.toLowerCase().replace(/\s+/g, "-")}/${
              post.id
            }`}
          >
            Leer más
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
