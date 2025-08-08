import dynamic from "next/dynamic";

const PlaybooksPage = dynamic(() => import("@/components/playbooks/PlaybooksPage"), { ssr: false });

export default function Page() {
  return <PlaybooksPage />;
}