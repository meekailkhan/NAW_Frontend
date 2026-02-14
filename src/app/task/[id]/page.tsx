import AuthGuard from "@/components/AuthGuard";
import { SingleTask } from "@/components/SingleTask";

async function SingleTaskPage({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const taskId = Array.isArray(id) ? id[0] : id;
  return (
    <AuthGuard>
      <div>
        <SingleTask id={taskId ?? ""} />
      </div>
    </AuthGuard>
  );
}

export default SingleTaskPage;
