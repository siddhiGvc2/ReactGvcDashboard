import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/zestSections/MachineData/view';
import StatusSelection from 'src/zestSections/MachineData/statusSelection';



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
