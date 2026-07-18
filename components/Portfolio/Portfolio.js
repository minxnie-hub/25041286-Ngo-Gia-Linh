import React from 'react';
import assetPath from '../../utils/assetPath';

const profile = {
  name: 'Ngô Gia Linh',
  cohort: 'QH2025',
  studentId: '25041286',
  faculty: 'Khoa Ngôn ngữ và Văn hóa Nga',
  school: 'Trường Đại học Ngoại ngữ – ĐHQGHN',
  interests: 'Nghe nhạc · Xem phim',
  goal: 'Cải thiện kỹ năng giao tiếp và ứng dụng công nghệ hiệu quả trong học tập.',
  career: 'Phiên dịch viên',
};

function cleanText(value = '') {
  let text = value
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();

  if (!text || /^[-–—_]{4,}$/.test(text)) return '';

  if (text.length % 2 === 0) {
    const half = text.length / 2;
    if (text.slice(0, half) === text.slice(half)) text = text.slice(0, half);
  }

  return text;
}

function normalizeRow(row = []) {
  const normalized = [];
  row.forEach(cell => {
    const value = cleanText(String(cell || ''));
    if (!value && normalized.length === 0) return;
    if (normalized[normalized.length - 1] !== value) normalized.push(value);
  });
  while (normalized.length && !normalized[normalized.length - 1]) normalized.pop();
  return normalized;
}

function paragraphKind(text, style = '') {
  if (!text) return 'empty';
  if (/Heading/i.test(style)) return 'heading';
  if (/^(I|II|III|IV|V|VI|VII|VIII|IX|X)\.?\s/.test(text)) return 'heading';
  if (/^\d+\.\d+\.?\s/.test(text)) return 'subheading';
  if (/^(TÁC VỤ|GIAI ĐOẠN|KẾT LUẬN|MỤC TIÊU|CHỦ ĐỀ|BÁO CÁO)/i.test(text)) {
    return 'heading';
  }
  if (text.length < 105 && text === text.toUpperCase() && /[A-ZÀ-ỸА-Я]/.test(text)) {
    return 'heading';
  }
  if (/^[•●▪◦-]\s*/.test(text)) return 'bullet';
  return 'paragraph';
}

function EvidenceImages({ images, assignment, blockIndex }) {
  if (!images || images.length === 0) return null;

  return (
    <div className={`evidence-grid evidence-grid--${Math.min(images.length, 3)}`}>
      {images.map((image, imageIndex) => (
        <figure className="evidence" key={`${blockIndex}-${image}`}>
          <img
            src={assetPath(`/assets/assignments/${assignment.slug}/${image}`)}
            alt={`${assignment.title} – minh chứng ${blockIndex + imageIndex + 1}`}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            Minh chứng {String(blockIndex + imageIndex + 1).padStart(2, '0')}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ReportBlock({ block, assignment, index }) {
  if (block.type === 'table') {
    const rows = (block.rows || []).map(normalizeRow).filter(row => row.some(Boolean));
    if (!rows.length) return null;

    return (
      <div className="report-table-wrap">
        <table className="report-table">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${index}-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  const Cell = rowIndex === 0 ? 'th' : 'td';
                  return <Cell key={`${index}-${rowIndex}-${cellIndex}`}>{cell}</Cell>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const text = cleanText(block.text || '');
  const kind = paragraphKind(text, block.style || '');
  const images = block.images || [];

  if (!text && !images.length) return null;

  return (
    <div className={`report-block report-block--${kind}`}>
      {kind === 'heading' && text ? <h3>{text}</h3> : null}
      {kind === 'subheading' && text ? <h4>{text}</h4> : null}
      {kind === 'paragraph' && text ? <p>{text}</p> : null}
      {kind === 'bullet' && text ? <p className="report-bullet">{text.replace(/^[•●▪◦-]\s*/, '')}</p> : null}
      <EvidenceImages
        images={images}
        assignment={assignment}
        blockIndex={index}
      />
    </div>
  );
}

function MenuLink({ href, children, onNavigate, index }) {
  return (
    <a
      href={href}
      className="menu-link"
      style={{ '--menu-index': index }}
      onClick={event => onNavigate(event, href)}
    >
      <span className="menu-link__index">{String(index).padStart(2, '0')}</span>
      <span>{children}</span>
    </a>
  );
}

export default function Portfolio({ assignments }) {
  const [ready, setReady] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [headerSolid, setHeaderSolid] = React.useState(false);
  const progressRef = React.useRef(null);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setReady(true), reducedMotion ? 30 : 300);
    return () => window.clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    revealItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [assignments]);

  React.useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? scrollTop / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, progress)})`;
      }
      setHeaderSolid(current => {
        const next = scrollTop > 64;
        return current === next ? current : next;
      });
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    const onKeyDown = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-is-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleNavigate = React.useCallback((event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    }
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Chuyển đến nội dung chính
      </a>

      <div className={`page-loader ${ready ? 'page-loader--done' : ''}`} aria-hidden="true">
        <div className="page-loader__mark">NGL</div>
        <div className="page-loader__line"><span /></div>
        <p>Portfolio · 2026</p>
      </div>

      <div className={`site ${ready ? 'site--ready' : ''}`}>
        <div className="scroll-progress" ref={progressRef} />

        <header className={`site-header ${headerSolid ? 'site-header--solid' : ''}`}>
          <a
            href="#top"
            className="brand"
            aria-label="Về đầu trang"
            onClick={event => handleNavigate(event, '#top')}
          >
            <span className="brand__monogram">NGL</span>
            <span className="brand__copy">
              <strong>Ngô Gia Linh</strong>
              <small>Russian Studies · QH2025</small>
            </span>
          </a>

          <nav className="quick-nav" aria-label="Điều hướng nhanh">
            <a href="#about" onClick={event => handleNavigate(event, '#about')}>Giới thiệu</a>
            <a href="#assignments" onClick={event => handleNavigate(event, '#assignments')}>6 bài tập</a>
            <a href="#contact" onClick={event => handleNavigate(event, '#contact')}>Liên hệ</a>
          </nav>

          <button
            className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(value => !value)}
          >
            <span />
            <span />
          </button>
        </header>

        <aside className={`menu-panel ${menuOpen ? 'menu-panel--open' : ''}`} aria-hidden={!menuOpen}>
          <div className="menu-panel__meta">
            <p>Portfolio học phần</p>
            <p>Nhập môn Công nghệ số & AI</p>
          </div>
          <nav className="menu-panel__nav" aria-label="Menu chính">
            <MenuLink href="#about" onNavigate={handleNavigate} index={1}>Giới thiệu</MenuLink>
            {assignments.map((assignment, assignmentIndex) => (
              <MenuLink
                key={assignment.slug}
                href={`#${assignment.slug}`}
                onNavigate={handleNavigate}
                index={assignmentIndex + 2}
              >
                {assignment.shortTitle}
              </MenuLink>
            ))}
            <MenuLink href="#contact" onNavigate={handleNavigate} index={8}>Liên hệ</MenuLink>
          </nav>
          <div className="menu-panel__footer">
            <span>{profile.studentId}</span>
            <span>Portfolio 2026</span>
          </div>
        </aside>

        <main id="main-content">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero__media">
              <img
                src={assetPath('/assets/profile/image2.png')}
                alt="Ảnh chân dung Ngô Gia Linh"
                fetchpriority="high"
              />
            </div>
            <div className="hero__wash" />
            <div className="hero__microcopy hero__microcopy--left">
              <span>ULIS · VNU</span>
              <span>NGÔN NGỮ & VĂN HÓA NGA</span>
            </div>
            <div className="hero__microcopy hero__microcopy--right">
              <span>ПОРТФОЛИО</span>
              <span>2025 — 2026</span>
            </div>
            <h1 className="hero__title" id="hero-title">NGÔ GIA LINH</h1>
            <div className="hero__scroll" aria-hidden="true">
              <span>Cuộn để khám phá</span>
              <i />
            </div>
          </section>

          <section className="about section" id="about">
            <div className="section-kicker" data-reveal>
              <span>01</span>
              <p>Giới thiệu</p>
            </div>

            <div className="about__layout">
              <figure className="about__portrait" data-reveal>
                <img
                  src={assetPath('/assets/profile/image4.png')}
                  alt="Chân dung Ngô Gia Linh"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{profile.name} · {profile.studentId}</figcaption>
              </figure>

              <div className="about__copy">
                <p className="about__lead" data-reveal>
                  Mình là <strong>Ngô Gia Linh</strong>, sinh viên {profile.cohort}, {profile.faculty}, {profile.school}.
                </p>
                <div className="about__paragraphs" data-reveal>
                  <p>
                    Mình thích nghe nhạc và xem phim. Mục tiêu hiện tại là cải thiện kỹ năng giao tiếp, đồng thời ứng dụng công nghệ một cách hiệu quả trong học tập.
                  </p>
                  <p>
                    Sáu bài tập trong portfolio ghi lại quá trình thực hành công nghệ số, nghiên cứu ngôn ngữ, cộng tác trực tuyến và sử dụng AI có trách nhiệm.
                  </p>
                </div>
              </div>
            </div>

            <div className="profile-strip" data-reveal>
              <div><span>Thông tin</span><strong>{profile.cohort}</strong><small>{profile.faculty}</small></div>
              <div><span>Sở thích</span><strong>{profile.interests}</strong><small>Âm nhạc · Điện ảnh</small></div>
              <div><span>Mục tiêu</span><strong>Kỹ năng giao tiếp</strong><small>Công nghệ trong học tập</small></div>
              <div><span>Định hướng</span><strong>{profile.career}</strong><small>Ngôn ngữ Nga</small></div>
            </div>

            <div className="career-panel" data-reveal>
              <div className="career-panel__title">
                <span>Định hướng nghề nghiệp</span>
                <h2>PHIÊN DỊCH VIÊN</h2>
              </div>
              <figure>
                <img
                  src={assetPath('/assets/profile/image6.png')}
                  alt="Hoạt động của Khoa Ngôn ngữ và Văn hóa Nga"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </section>

          <section className="assignments-intro section" id="assignments">
            <div className="section-kicker section-kicker--dark" data-reveal>
              <span>02</span>
              <p>Hồ sơ học tập</p>
            </div>
            <div className="assignments-intro__grid">
              <h2 data-reveal>06 BÀI TẬP<br />MỘT HÀNH TRÌNH SỐ</h2>
              <p data-reveal>
                Nội dung được trình bày theo đúng thứ tự báo cáo: chữ, bảng và ảnh minh chứng đi cùng ngữ cảnh, không tách rời thành một thư viện ảnh riêng.
              </p>
            </div>
          </section>

          <div className="assignment-list">
            {assignments.map((assignment, assignmentIndex) => (
              <article
                className={`assignment assignment--${assignmentIndex % 2 === 0 ? 'light' : 'dark'}`}
                id={assignment.slug}
                key={assignment.slug}
              >
                <header className="assignment__header section">
                  <div className="assignment__number" data-reveal>{assignment.number}</div>
                  <div className="assignment__heading" data-reveal>
                    <p>{assignment.eyebrow}</p>
                    <h2>{assignment.title}</h2>
                  </div>
                  <p className="assignment__summary" data-reveal>{assignment.summary}</p>
                </header>

                <div className="report-shell section" data-reveal>
                  <div className="report-shell__topline">
                    <span>Bài tập {assignment.number}</span>
                    <span>Ngô Gia Linh · {profile.studentId}</span>
                  </div>
                  <div className="report-content">
                    {assignment.blocks.map((block, blockIndex) => (
                      <ReportBlock
                        block={block}
                        assignment={assignment}
                        index={blockIndex}
                        key={`${assignment.slug}-${blockIndex}`}
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="closing section" id="contact">
            <div className="section-kicker" data-reveal>
              <span>03</span>
              <p>Tổng kết</p>
            </div>
            <div className="closing__grid">
              <h2 data-reveal>HỌC ĐỂ<br />LÀM CHỦ<br />CÔNG NGHỆ.</h2>
              <div className="closing__copy" data-reveal>
                <p>
                  Portfolio này là dấu mốc ghi lại quá trình mình chuyển từ thao tác số cơ bản sang tư duy sử dụng công nghệ có mục tiêu, có kiểm chứng và có trách nhiệm.
                </p>
                <dl>
                  <div><dt>Họ tên</dt><dd>{profile.name}</dd></div>
                  <div><dt>MSSV</dt><dd>{profile.studentId}</dd></div>
                  <div><dt>Đơn vị</dt><dd>ULIS · VNU</dd></div>
                </dl>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div>
            <strong>{profile.name}</strong>
            <span>MSSV {profile.studentId}</span>
          </div>
          <div>
            <strong>{profile.faculty}</strong>
            <span>ULIS · VNU</span>
          </div>
          <div className="footer__portfolio">
            <strong>Portfolio</strong>
            <span>2026</span>
          </div>
        </footer>
      </div>
    </>
  );
}
