BẢN V3 — DEPLOY KHÔNG CẦN NPM

Nguyên nhân lỗi trước:
- GitHub Actions dừng tại npm ci với lỗi nội bộ của npm: "Exit handler never called!".

Bản này đã có sẵn website tĩnh trong thư mục out/.
Workflow chỉ tải thư mục out lên GitHub Pages, không chạy npm ci hoặc npm run build.
Vì vậy các thư mục cũ còn sót trong repository cũng không ảnh hưởng đến deploy.

CÁCH CẬP NHẬT:
1. Giải nén file ZIP.
2. Chép toàn bộ nội dung bên trong thư mục 25041286-Ngo-Gia-Linh vào đúng thư mục repository trên máy.
3. Chọn Replace/Overwrite khi được hỏi.
4. Chạy:
   git add -A
   git commit -m "Deploy prebuilt portfolio without npm"
   git push

Sau khi push, workflow chỉ còn các bước Checkout, Configure Pages, Upload và Deploy.
