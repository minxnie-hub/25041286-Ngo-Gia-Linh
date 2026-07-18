# Portfolio Ngô Gia Linh - V7

Bản này là website tĩnh hoàn chỉnh, không cần npm.

## Cấu trúc

- `site/index.html`: trang chủ, chỉ có giới thiệu và 6 thẻ bài tập.
- `site/bai-tap-1` đến `site/bai-tap-6`: sáu trang chi tiết riêng.
- `site/styles.css`: toàn bộ giao diện và responsive.
- `site/app.js`: menu, loader, chuyển trang, reveal, lightbox và hiệu ứng canvas xóa theo chuột.
- `site/assets`: ảnh cá nhân và ảnh minh chứng.
- `content`: dữ liệu gốc của 6 bài để đối chiếu.
- `.github/workflows/deploy-pages.yml`: deploy trực tiếp thư mục `site` lên GitHub Pages.

## Cập nhật repo

1. Giữ lại duy nhất thư mục `.git` trong repo trên máy.
2. Xóa các file cũ còn lại.
3. Chép toàn bộ nội dung bản V7 vào thư mục repo.
4. Chạy:

```bash
git add -A
git commit -m "Split assignments into separate pages"
git push
```

Trong `git status` phải thấy `site/bai-tap-1/index.html` đến `site/bai-tap-6/index.html`.


## V7 visual fixes
- Hero title repositioned over the face.
- Removed the decorative cream circle/right-side panel.
- Improved contrast for the ULIS/Russian Studies label.
- Replaced assignment 1 thumbnail with the correct File Explorer evidence.
- Kept the cursor eraser interaction and no-npm GitHub Pages deployment.
