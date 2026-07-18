import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Portfolio học phần Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo của Ngô Gia Linh."
        />
        <meta name="theme-color" content="#07384a" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.svg`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
