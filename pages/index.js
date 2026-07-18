import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Portfolio from '../components/Portfolio/Portfolio';

const assignmentMeta = [
  {
    slug: 'bt1',
    number: '01',
    eyebrow: 'Digital foundations',
    title: 'Quản lý tệp tin và thư mục',
    shortTitle: 'Quản lý tệp',
    summary:
      'Thực hành đầy đủ các thao tác tạo, đổi tên, sao chép, di chuyển, xóa và khôi phục tệp tin trên Windows.',
  },
  {
    slug: 'bt2',
    number: '02',
    eyebrow: 'Academic research',
    title: 'Tìm kiếm và đánh giá thông tin học thuật',
    shortTitle: 'Tìm kiếm học thuật',
    summary:
      'Khảo sát ảnh hưởng của tiếng Anh đối với từ vựng kinh tế trong tiếng Nga đương đại qua hệ thống nguồn học thuật.',
  },
  {
    slug: 'bt3',
    number: '03',
    eyebrow: 'Prompt design',
    title: 'Viết prompt hiệu quả cho các tác vụ',
    shortTitle: 'Prompt hiệu quả',
    summary:
      'Thử nghiệm prompt cơ bản, cải tiến và nâng cao cho ba tác vụ học tập, sau đó so sánh chất lượng đầu ra.',
  },
  {
    slug: 'bt4',
    number: '04',
    eyebrow: 'Team workflow',
    title: 'Công cụ hợp tác trực tuyến cho dự án nhóm',
    shortTitle: 'Hợp tác trực tuyến',
    summary:
      'Tổ chức công việc nhóm bằng Trello, Google Docs, Google Drive và Discord với vai trò điều phối và tổng hợp nội dung.',
  },
  {
    slug: 'bt5',
    number: '05',
    eyebrow: 'Creative AI',
    title: 'AI tạo sinh hỗ trợ sáng tạo nội dung',
    shortTitle: 'Sáng tạo cùng AI',
    summary:
      'Phát triển cẩm nang số “Vượt qua nỗi sợ giao tiếp cùng trợ lý AI” bằng nhiều công cụ tạo sinh và đóng góp cá nhân.',
  },
  {
    slug: 'bt6',
    number: '06',
    eyebrow: 'Responsible AI',
    title: 'Sử dụng AI có trách nhiệm trong học tập',
    shortTitle: 'AI có trách nhiệm',
    summary:
      'Phân tích chính sách, liêm chính học thuật, quyền sở hữu trí tuệ và xây dựng nguyên tắc sử dụng AI minh bạch.',
  },
];

export async function getStaticProps() {
  const assignments = assignmentMeta.map(item => {
    const filePath = path.join(
      process.cwd(),
      'content',
      'assignments',
      item.slug.toUpperCase(),
      'content.json',
    );
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return { ...item, blocks: raw.blocks || [] };
  });

  return { props: { assignments } };
}

export default function Home({ assignments }) {
  return (
    <>
      <Head>
        <title>Ngô Gia Linh — Portfolio Công nghệ số</title>
      </Head>
      <Portfolio assignments={assignments} />
    </>
  );
}
