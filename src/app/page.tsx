import Image from 'next/image';
import { SignIn, SignOutButton, SignedIn } from "@clerk/nextjs";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Image
      className="m-20"
        src="/logo.svg"
        alt="Verse Logo"
        width={100}
        height={75}
      />
      <SignIn  />
      <SignedIn>          
            <SignOutButton />        
      </SignedIn>    
    </main>
  );
}