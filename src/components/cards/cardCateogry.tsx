import Link from "next/link";

import { ICategory } from "@/lib/declarations";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Icon from "../icon";

export const CardCategory = ({ category }: { category: ICategory }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className={`flex items-center`}>
          {category.icon && (
            <Icon
              name={category.icon}
              className={`mr-2 ${category.color}`}
              size={24}
            />
          )}
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link
            href={`/category/${category.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            Explorar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
