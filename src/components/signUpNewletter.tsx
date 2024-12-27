import { ArrowRight, Eclipse } from "lucide-react";
import { Button } from "./ui/button";

export default function SignUpNewsletter() {
  return (
    <div className="white max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-14     bg-muted px-4 text-foreground">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex grow gap-3">
          <Eclipse
            className="mt-0.5 shrink-0 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
            <p className="text-sm">
              We just added something awesome to make your experience even
              better.
            </p>
            <Button className="group whitespace-nowrap text-sm font-medium">
              Learn more
              <ArrowRight
                className="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
