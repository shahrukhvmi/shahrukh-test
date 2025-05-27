// File: src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useDebounce from '../hooks/useDebounce';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const debouncedSearch = useDebounce(search, 300);
    // categories image here ✌✌
    const categoryImages = {
        "electronics": "https://images.unsplash.com/photo-1580910051070-dc1e1b2c6fba?auto=format&fit=crop&w=60&q=80",
        "jewelery": "https://images.unsplash.com/photo-1611078489935-0cb9649a3e9e?auto=format&fit=crop&w=60&q=80",
        "men's clothing": "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=60&q=80",
        "women's clothing": "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=60&q=80",
        "all": "https://cdn-icons-png.flaticon.com/512/25/25694.png" // optional for 'all'
    };


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(setProducts);
    }, []);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(['all', ...data]));
    }, []);

    const filtered = products.filter(p => {
        const matchesCategory = category === 'all' || p.category === category;
        const matchesSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="mb-6">
                <input
                    className="w-full border rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl border shadow-sm transition-all duration-200 
        ${category === cat
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        <img
                            src={categoryImages[cat] || "https://via.placeholder.com/40"}
                            alt={cat}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="capitalize text-sm">{cat}</span>
                    </button>
                ))}
            </div>




            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">


                {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;