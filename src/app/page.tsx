import Link from "next/link";
import Image from 'next/image';
import { CreatePost } from "~/app/_components/create-post";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Image
        src="/logo.svg"
        alt="Verse Logo"
        width={125}
        height={75}
      />
      <div>
      sign up / sign in content 
      </div>
    </main>
  );
}