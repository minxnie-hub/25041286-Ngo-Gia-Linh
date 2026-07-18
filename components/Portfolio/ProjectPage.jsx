/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Arrow from '../Icons/Arrow';
import assetUrl from '../../utils/assetUrl';
import {
  Article,
  ArticleBody,
  ArticleIntro,
  ArticleSection,
  BackLink,
  BodyCopy,
  DownloadLink,
  EvidenceGrid,
  HeroArtwork,
  HeroDetails,
  HeroInner,
  HeroTitle,
  ListItem,
  NextLink,
  NextProject,
  ProjectAside,
  ProjectHero,
  ProjectMeta,
  TableFrame,
  ToolList,
  TypeArtwork,
} from './ProjectPage.styles';

const ParagraphImages = ({ images, text, blockIndex }) => {
  if (!images || images.length === 0) return null;
  return (
    <EvidenceGrid className={images.length === 1 ? 'single' : ''}>
      {images.map((image, index) => (
        <figure key={`${image}-${index}`}>
          <img
            src={assetUrl(image)}
            alt={
              text
                ? ''
                : `Ảnh minh chứng ${blockIndex + 1}.${index + 1} của bài tập`
            }
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}
    </EvidenceGrid>
  );
};

const ContentBlock = ({ block, index }) => {
  if (block.type === 'table') {
    const [header, ...rows] = block.rows;
    return (
      <TableFrame key={`table-${index}`}>
        <table>
          <thead>
            <tr>
              {header.map((cell, cellIndex) => (
                <th key={cellIndex}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableFrame>
    );
  }

  const text = block.text;
  const content =
    text &&
    (block.type === 'heading1' ? (
      <h2>{text}</h2>
    ) : block.type === 'heading2' ? (
      <h3>{text}</h3>
    ) : block.type === 'list' ? (
      <ListItem>{text.replace(/^[•-]\s*/, '')}</ListItem>
    ) : (
      <BodyCopy>{text}</BodyCopy>
    ));

  return (
    <React.Fragment key={`block-${index}`}>
      {content}
      <ParagraphImages images={block.images} text={text} blockIndex={index} />
    </React.Fragment>
  );
};

const ProjectPage = ({ project, blocks, nextProject }) => (
  <>
    <Head>
      <title>{project.title} - Ngô Gia Linh</title>
      <meta name="description" content={project.summary} />
    </Head>
    <main id="main-content">
      <ProjectHero>
        <HeroInner>
          <BackLink>
            <Link href="/#projects">
              <a>
                <Arrow /> Quay lại 6 bài tập
              </a>
            </Link>
          </BackLink>
          <ProjectMeta>
            <span>{project.number} / 06</span>
            <span>{project.eyebrow}</span>
            <span>{project.year}</span>
          </ProjectMeta>
          <HeroTitle>{project.title}</HeroTitle>
          <HeroDetails>
            <p>{project.summary}</p>
            <blockquote>{project.highlight}</blockquote>
          </HeroDetails>
          <HeroArtwork className={!project.cover ? 'type-only' : ''}>
            {project.cover ? (
              <img
                src={assetUrl(project.cover)}
                alt={`Ảnh đại diện ${project.title}`}
                decoding="async"
              />
            ) : (
              <TypeArtwork>
                <b>Я</b>
                <span>EN → RU</span>
                <small>англицизмы в экономической лексике</small>
              </TypeArtwork>
            )}
          </HeroArtwork>
        </HeroInner>
      </ProjectHero>

      <ArticleSection>
        <Article>
          <ProjectAside>
            <div>
              <span>Vai trò / kỹ năng</span>
              <ToolList>
                {project.tools.map(tool => (
                  <li key={tool}>{tool}</li>
                ))}
              </ToolList>
            </div>
            <div>
              <span>Tài liệu gốc</span>
              <DownloadLink href={assetUrl(project.document)} download>
                Tải file Word <Arrow />
              </DownloadLink>
            </div>
          </ProjectAside>
          <ArticleBody>
            <ArticleIntro>
              <span>Nội dung bài tập</span>
              <p>
                Nội dung dưới đây được chuyển trực tiếp từ tài liệu Word gốc của
                Gia Linh, bao gồm bảng và ảnh minh chứng.
              </p>
            </ArticleIntro>
            {blocks.map((block, index) => (
              <ContentBlock block={block} index={index} key={index} />
            ))}
          </ArticleBody>
        </Article>
      </ArticleSection>

      <NextProject>
        <p>Dự án tiếp theo / {nextProject.number}</p>
        <Link href={`/projects/${nextProject.slug}`} passHref>
          <NextLink>
            <span>{nextProject.title}</span>
            <Arrow />
          </NextLink>
        </Link>
      </NextProject>
    </main>
  </>
);

export default React.memo(ProjectPage);
