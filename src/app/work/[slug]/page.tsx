import { notFound } from "next/navigation";
import { ConceptDemo } from "@/components/demos/ConceptDemo";
import { concepts, getConcept } from "@/lib/concepts";

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const concept = getConcept(slug);
    if (!concept) return { title: "Concept" };
    return {
      title: concept.title,
      description: concept.blurb,
    };
  });
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  return <ConceptDemo concept={concept} />;
}
