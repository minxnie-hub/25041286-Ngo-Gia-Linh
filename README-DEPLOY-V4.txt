BẢN V4 — DEPLOY KHÔNG DÙNG NPM

Nguyên nhân bản V3 lỗi:
Thư mục out/ đang bị loại bởi .gitignore nên không được push lên GitHub. Workflow vì thế không tìm thấy ./out.

Bản V4 chuyển website dựng sẵn sang thư mục site/ (không bị .gitignore loại bỏ) và workflow upload ./site.

Cách cập nhật:
1. Chép hai thư mục .github và site vào đúng thư mục gốc của repository.
2. Chọn Replace/Overwrite khi Windows hỏi.
3. Chạy:
   git add -A
   git commit -m "Fix Pages artifact path"
   git push

Kiểm tra trước khi commit:
   git status
Phải thấy nhiều file mới bên dưới site/ và file .github/workflows/deploy-pages.yml được sửa.

Không cần chép README-DEPLOY-V4.txt nếu không muốn.
