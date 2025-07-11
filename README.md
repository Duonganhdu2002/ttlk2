# TikTok Admin Panel

Admin panel đơn giản để quản lý sản phẩm TikTok với chức năng thêm, sửa, xóa.

## Chức năng

### 📱 Xác thực
- Đăng nhập bằng email/password qua Supabase Auth
- Session management tự động

### 📂 Quản lý Danh mục
- Thêm danh mục mới
- Sửa tên danh mục
- Xóa danh mục
- Danh sách tất cả danh mục

### 📦 Quản lý Sản phẩm
- Thêm sản phẩm mới với:
  - Link hình ảnh
  - Giá (VND)
  - Link sản phẩm TikTok
  - Danh mục
- Sửa thông tin sản phẩm
- Xóa sản phẩm
- Xem danh sách tất cả sản phẩm
- Hiển thị hình ảnh sản phẩm

## Development

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## Environment Variables

Tạo file `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment to Vercel

### 1. Chuẩn bị project
```bash
# Đảm bảo project build thành công
npm run build

# Commit tất cả changes
git add .
git commit -m "Setup admin panel for deployment"
git push origin main
```

### 2. Deploy lên Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub account
3. Click "New Project"
4. Import repository này
5. Chọn folder `admin/` làm root directory
6. Thêm Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
7. Click "Deploy"

### 3. Environment Variables cần thiết
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Routes

- `/` - Redirect to dashboard
- `/login` - Đăng nhập
- `/dashboard` - Trang chủ admin
- `/dashboard/categories` - Quản lý danh mục
- `/dashboard/products` - Quản lý sản phẩm
