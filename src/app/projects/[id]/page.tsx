import { ProjectDetail } from "@/app/components/components/ProjectDetail";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetail id={params.id} />
}