import WidgetCards from '../modules/widgets/WidgetCards';
import styles from './index.module.scss';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={`${styles.page} lg:pt-32 bg-slate-300 h-screen`}>
      <div className="wrapper">
        <div className="container">
          <WidgetCards />
        </div>
      </div>
    </div>
  );
}

export default Index;
