import * as React from 'react';
import ProductList from './category-list/ProductList';
import ProductSideBar from './category-list/ProductSideBar';

interface Subcategory {
  title: string;
  items: string[];
}

interface Category {
  category: string;
  id: number;
  subcategories: Subcategory[];
}

type CategoriesData = Category[];

interface CategoryViewProps {
  categoriesData: CategoriesData;
}

const CategoryView: React.FC<CategoryViewProps> = ({ categoriesData }) => {
  console.log(categoriesData);
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold py-10">WOMEN&apos;S</h1>

      <div className="flex flex-row justify-around w-full gap-4">
        <div className="">
          <ProductSideBar />
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default CategoryView;
