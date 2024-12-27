import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAuthor } from "@/lib/declarations";

export default function AvatarAuthor({
  author,
}: Readonly<{ author: IAuthor }>) {
  return (
    <address className="flex items-center mb-6 not-italic">
      <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white space-x-4">
        <Avatar>
          <AvatarImage src="" alt="Kelly King" />
          <AvatarFallback>{author.short_name}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {author.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {author.description}
          </p>
        </div>
      </div>
    </address>
  );
}
