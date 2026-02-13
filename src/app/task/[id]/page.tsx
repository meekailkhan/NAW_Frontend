import { SingleTask } from "@/components/SingleTask";

async function SingleTaskPage({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const taskId = Array.isArray(id)? id[0] : id; 
  return (
      <div>
        <SingleTask id={taskId?? ""} />
      </div>
  )
}

export default SingleTaskPage;