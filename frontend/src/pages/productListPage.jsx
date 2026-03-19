import { useState } from 'react';
import { Search } from 'lucide-react';
import { useGetProductsQuery } from '../app/api/productsApi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = ['Electronics', 'Footwear', 'Kitchen', 'Clothing', 'Fitness'];

export default function ProductListPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const params = search ? { search } : category ? { category } : {};
  const { data: products = [], isLoading, isError } = useGetProductsQuery(params);

  return (
    <div>
   
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCategory(''); }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setSearch(''); }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            text-gray-700 bg-white"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

   
      {isLoading && (
        <LoadingSpinner variant="page" message="Loading products..." />
      )}

      {isError && (
        <div className="text-center py-20">
          <p className="text-red-500 font-medium">Failed to load products.</p>
          <p className="text-gray-400 text-sm mt-1">Please check your connection and try again.</p>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="font-medium">No products found</p>
          <p className="text-sm mt-1">Try a different search or category.</p>
        </div>
      )}


      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}