import { DESK_TAKES } from "@/bench/desk-takes";
import { firstQuery } from "@/bench/rounds";
import { BenchSubject } from "@/components/bench/BenchSubject";
import { OwnerDesk } from "@/components/desk/OwnerDesk";

type Search = {
  __benchRound?: string | string[];
  __benchTake?: string | string[];
};

export default async function DeskPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const query = await searchParams;
  return (
    <BenchSubject
      subject="owner-desk"
      round={firstQuery(query.__benchRound)}
      take={firstQuery(query.__benchTake)}
      takes={DESK_TAKES}
    >
      <OwnerDesk />
    </BenchSubject>
  );
}
