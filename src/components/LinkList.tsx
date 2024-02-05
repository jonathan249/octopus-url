import React from "react";
import { type Link as TLink } from "~/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import Link from "next/link";

interface LinkList<T> {
  items: T[];
}

export function LinkList<T extends TLink>(props: LinkList<T>) {
  const { items } = props;

  return (
    <div className="mt-5 flex flex-col gap-5">
      {items.map((item) => {
        return (
          <div
            className={
              "flex flex-col gap-2 rounded-lg border border-black/10 p-2 transition-all duration-150 ease-in-out hover:border-slate-900/90"
            }
            key={item.id}
          >
            <h1>Url: {item.url}</h1>
            <HoverCard>
              <HoverCardTrigger className="w-fit">
                <span className="w-fit">Slug: {item.slug}</span>
              </HoverCardTrigger>
              <HoverCardContent>
                <Link href={`/go/${item.slug}`} className="flex flex-row gap-2">
                  Visit <p className="underline">{item.url}</p>
                </Link>
              </HoverCardContent>
            </HoverCard>
            <span>CreatedBy: {item.userId}</span>
          </div>
        );
      })}
    </div>
  );
}
