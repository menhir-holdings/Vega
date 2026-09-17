import { PublicSite } from "@/components/public/PublicSite";
import { firstQuery } from "@/bench/rounds";

type Search = {
  __benchRound?: string | string[];
  __benchTake?: string | string[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const query = await searchParams;
  return (
    <PublicSite
      benchRound={firstQuery(query.__benchRound)}
      benchTake={firstQuery(query.__benchTake)}
    />
  );
}
