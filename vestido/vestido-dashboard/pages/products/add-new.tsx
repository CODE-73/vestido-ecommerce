import { NextPage } from 'next';
import ProductForm from '../../modules/products/ProductForm';

const AddProductPage: NextPage = () => <ProductForm isNew={true} />;

export default AddProductPage;
