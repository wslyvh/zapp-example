import { ZupassConnector } from "@/components/zapp";

export default function Home() {
  return (
    <main className="flex flex-col container m-auto p-4">
      <h1 className='text-xl font-medium'>Zapp Example</h1>
      <ZupassConnector />
    </main>
  );
}
