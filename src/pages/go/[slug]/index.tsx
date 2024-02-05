import { api } from "~/utils/api";
import React from "react";
import { useRouter } from "next/router";
import Error from "next/error";

export default async function Go() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: link, isLoading } = api.links.bySlug.useQuery({
    slug: slug as string,
  });

  // when there is no such link with this id display nextjs 404 page
  if (!link) return <Error statusCode={404} />;
  if (isLoading) return <span>Loading...</span>;

  // redirect to the link
  if (link) {
    await router.push(link.url);
  }

  return <span>Redirecting...</span>;
}
