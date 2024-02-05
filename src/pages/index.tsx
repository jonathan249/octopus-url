import React from "react";
import { api } from "~/utils/api";
import { CreateLink } from "~/components/CreateLink";
import { LinkList } from "~/components/LinkList";
import { Skeleton } from "~/components/ui/skeleton";
import { type Link } from "~/types";

export default function Home() {
  const { data: links } = api.links.getAll.useQuery();

  if (!links) return <Skeleton />;

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl font-bold tracking-tight">
        URL-Shortener Octopus
      </h1>
      <CreateLink />
      <LinkList<Link> items={links} />
    </div>
  );
}
