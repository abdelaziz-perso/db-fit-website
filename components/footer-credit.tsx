import Link from "next/link";
import { siteCredits } from "@/lib/site/config";

type Props = {
  prefix: string;
};

export function FooterCredit({ prefix }: Props) {
  return (
    <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-600">
      <span>{prefix} </span>
      <Link
        href={siteCredits.developerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-zinc-600 underline-offset-2 hover:text-brand hover:underline dark:text-zinc-400"
      >
        {siteCredits.developerName}
      </Link>
    </p>
  );
}
