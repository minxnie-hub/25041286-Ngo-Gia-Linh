import fs from 'fs';
import path from 'path';
import React from 'react';
import ProjectPage from '../../components/Portfolio/ProjectPage';
import projects from '../../data/projects.json';

const ProjectRoute = ({ project, blocks, nextProject }) => (
  <ProjectPage project={project} blocks={blocks} nextProject={nextProject} />
);

export const getStaticPaths = async () => ({
  paths: projects.map(project => ({ params: { slug: project.slug } })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const project = projects.find(item => item.slug === params.slug);
  const currentIndex = projects.findIndex(item => item.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const contentPath = path.join(
    process.cwd(),
    'data',
    'project-content',
    `${params.slug}.json`,
  );
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

  return {
    props: {
      project,
      blocks: content.blocks,
      nextProject,
    },
  };
};

export default React.memo(ProjectRoute);
