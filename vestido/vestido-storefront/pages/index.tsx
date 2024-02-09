import HomePage from '../modules/HomePage/HomePage';
import { HorizontalScrollCards } from '../modules/HomePage/HorizontalScrollCards';

export function Index() {
  return (
    <div>
      <HomePage></HomePage>
      <div className='pt-3'><HorizontalScrollCards/></div>
    </div>
  );
}

export default Index;
