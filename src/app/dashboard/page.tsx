import DashboardLayout from '@/components/layout/DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Quản lý danh mục và sản phẩm TikTok
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📂</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Danh mục
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">-</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/categories" className="font-medium text-green-700 hover:text-green-900">
                  Quản lý danh mục →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📦</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Sản phẩm
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">-</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/products" className="font-medium text-indigo-700 hover:text-indigo-900">
                  Quản lý sản phẩm →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Hướng dẫn sử dụng
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Các chức năng chính của admin panel
            </p>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span className="text-sm text-gray-700">Quản lý danh mục: Thêm, sửa, xóa danh mục sản phẩm</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span className="text-sm text-gray-700">Quản lý sản phẩm: Thêm, sửa, xóa sản phẩm TikTok</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span className="text-sm text-gray-700">Dữ liệu sẽ hiển thị trên trang public tự động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 