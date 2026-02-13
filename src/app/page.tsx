import { AllTask } from "@/components/AllTask";
import AuthGuard from "@/components/AuthGuard";


export default function Home() {
  return (
    <AuthGuard>
      <AllTask />
    </AuthGuard>
  );
}
