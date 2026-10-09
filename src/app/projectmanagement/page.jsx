import { fetchProjects } from '@/app/lib/projects';
import ProjectManagementScreen from '@/screens/ProjectManagementScreen';

export const revalidate = 60;

export const metadata = {
  title: 'Project Management & Project Updates | KEC Biofuel',
  description:
    'Track KEC Biofuel active and onboarded CBG projects - capacity, scope, stage, progress and project-specific updates.',
  keywords: 'KEC Biofuel projects, CBG project management, active CBG projects, onboarded projects, project updates',
  alternates: { canonical: 'https://www.kecbiofuel.com/projectmanagement' },
  openGraph: {
    title: 'Project Management & Project Updates | KEC Biofuel',
    description: 'Active and onboarded CBG projects with live project updates.',
    type: 'website',
    url: 'https://www.kecbiofuel.com/projectmanagement',
    siteName: 'KEC Biofuel',
  },
};

export default async function ProjectManagementPage() {
  const projects = await fetchProjects();
  return <ProjectManagementScreen projects={projects} />;
}
