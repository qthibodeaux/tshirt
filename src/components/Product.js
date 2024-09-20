import { useMediaQuery } from 'react-responsive';
import { ProductDesktop, ProductMobile } from '../partials';

const Product = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return isMobile ? <ProductMobile /> : <ProductDesktop />;
};

export default Product;
