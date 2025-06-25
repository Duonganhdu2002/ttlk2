'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ProductsService } from '@/services/products.service'
import { CategoriesService } from '@/services/categories.service'
import { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: { 
    id: string;
    name: string;
  } | null;
}
type Category = Database['public']['Tables']['categories']['Row']

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    image_url: '',
    price: '',
    product_link: '',
    category_id: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        ProductsService.getAllProducts(),
        CategoriesService.getAllCategories()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Không thể tải dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.image_url || !formData.price || !formData.product_link || !formData.category_id) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    try {
      const productData = {
        name: formData.name,
        image_url: formData.image_url,
        price: parseFloat(formData.price),
        product_link: formData.product_link,
        category_id: formData.category_id
      }

      if (editingProduct) {
        await ProductsService.updateProduct(editingProduct.id, productData)
      } else {
        await ProductsService.createProduct(productData)
      }

      resetForm()
      await loadData()
    } catch (err) {
      console.error('Error saving product:', err)
      setError('Không thể lưu sản phẩm')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return

    try {
      await ProductsService.deleteProduct(id)
      await loadData()
    } catch (err) {
      console.error('Error deleting product:', err)
      setError('Không thể xóa sản phẩm')
    }
  }

  const openEditForm = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      image_url: product.image_url || '',
      price: product.price?.toString() || '',
      product_link: product.product_link || '',
      category_id: product.category_id || ''
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      image_url: '',
      price: '',
      product_link: '',
      category_id: ''
    })
    setError(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
            <p className="mt-1 text-sm text-gray-600">
              Thêm, sửa, xóa sản phẩm TikTok
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Thêm sản phẩm
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link hình ảnh
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá (VND)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    min="0"
                    step="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="100000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link sản phẩm TikTok
                  </label>
                  <input
                    type="url"
                    value={formData.product_link}
                    onChange={(e) => setFormData({...formData, product_link: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://www.tiktok.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    {editingProduct ? 'Cập nhật' : 'Thêm'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Đang tải...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Chưa có sản phẩm nào
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 object-cover rounded-lg"
                        src={product.image_url || '/images/placeholder-product.jpg'}
                        alt="Product"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg'
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {product.name || 'Tên sản phẩm'}
                          </p>
                          <p className="text-md font-semibold text-green-600">
                            {formatPrice(product.price || 0)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Danh mục: {product.categories?.name || 'Không xác định'}
                          </p>
                          <p className="text-xs text-gray-400">
                            Tạo: {new Date(product.created_at).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <a
                            href={product.product_link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm hover:bg-green-200"
                          >
                            Xem
                          </a>
                          <button
                            onClick={() => openEditForm(product)}
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm hover:bg-yellow-200"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm hover:bg-red-200"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
} 