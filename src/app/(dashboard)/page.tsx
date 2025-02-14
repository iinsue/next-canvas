import { protectServer } from "@/features/auth/utils";
import { Banner } from "./banner";

export default async function Home() {
  await protectServer();

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col space-y-6 pb-10">
      <Banner />
    </div>
  );
}
