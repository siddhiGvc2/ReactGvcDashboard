import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';
import StatusSelection from 'src/sections/products/statusSelection';



// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsView />
      <StatusSelection/>
    </>
  );
}
