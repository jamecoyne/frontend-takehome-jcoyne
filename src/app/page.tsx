import Image from 'next/image';
import { SignIn, SignOutButton, SignedIn } from "@clerk/nextjs";

export default async function Home() {

  return (
    <main id="sign-in-page" className="flex flex-col items-center justify-center " style={{height: 'calc(100vh - 56px)'}}>
      <Image
      className="m-20"
        src="/logo.svg"
        alt="Verse Logo"
        width={100}
        height={75}
      />
      <SignIn routing='hash' fallbackRedirectUrl={'/main'} />
      <SignedIn>          
            <SignOutButton />        
      </SignedIn>    
    </main>
  );
}