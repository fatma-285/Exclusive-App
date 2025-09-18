import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <section className="container mx-auto">
      <Skeleton className="h-[125px] w-full rounded-xl" />
    </section>
  );
}
