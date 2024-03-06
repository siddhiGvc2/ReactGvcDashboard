import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/MachineData/view';
import StatusSelection from 'src/sections/MachineData/statusSelection';



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
