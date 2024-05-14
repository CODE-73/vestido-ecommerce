import { NextPage } from 'next';
import CategoryForm from '../../modules/categories/CategoryForm';

const AddCategoryPage: NextPage = () => <CategoryForm isNew={true} />;

export default AddCategoryPage;
