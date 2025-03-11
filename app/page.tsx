import { EditDistanceForm } from "@/components/EditDistanceForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 font-mono">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8 lg:mb-0 w-full">
          Edit Distance Calculator
        </h1>
      </div>
      <EditDistanceForm />
    </main>
  );
}
