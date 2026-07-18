# Portfolio Ngô Gia Linh — MSSV 25041286

Portfolio học phần **Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo**, xây dựng bằng Next.js và xuất tĩnh để deploy trên GitHub Pages.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Build production

```bash
npm run build
```

Lệnh này tạo website tĩnh trong thư mục `out/`.

## Deploy GitHub Pages

1. Đẩy toàn bộ source lên repository GitHub, khuyến nghị đặt tên `25041286-Ngo-Gia-Linh`.
2. Vào **Settings → Pages**.
3. Tại **Build and deployment**, chọn **GitHub Actions**.
4. Push lên nhánh `main`; workflow `.github/workflows/deploy-pages.yml` sẽ tự build và deploy.

Cấu hình tự nhận tên repository để tạo đúng `basePath`, nên không bị lỗi ảnh hoặc `_next` khi chạy dưới đường dẫn GitHub Pages.
