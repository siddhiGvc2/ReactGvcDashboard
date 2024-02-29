// import { useState } from 'react';

// import Stack from '@mui/material/Stack';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { products } from 'src/_mock/products';

import MachineCard from '../machine-card';
import StatusSelection from '../statusSelection';
// import { Stack } from '@mui/material';
// import { Stack } from '@mui/material';
// import ProductCard from '../product-card';
// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';
// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container maxWidth='xxl'>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Machine Data
      </Typography>
     <Grid container spacing={2} maxWidth='xxl'>
       <Grid xs={12} md={3} lg={3}>
        <StatusSelection/>
       </Grid>
  
      <Grid   xs={12} md={10} lg={9} >
        <Stack  container spacing={1} direction='row' justifyContent='center'>
        <Grid  xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Machines"
            total="..."
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Online Machines"
            total="..."
            color="info"
            icon={<img alt="icon" src="/assets/icons/online.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Collections"
            total="..."
            color="info"
            icon={<img alt="icon" src="/assets/icons/collection.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Item Despensed"
            total="..."
            color="error"
            icon={<img alt="icon" src="/assets/icons/items.png" />}
          />
        </Grid>
        </Stack>
        <Stack  container spacing={1} direction='row' justifyContent='center'>
        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Machines"
            total="..."
            color="success"
            icon={<img alt="icon" src="/assets/icons/machineInstalled.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Online Machines"
            total="..."
            color="info"
            icon={<img alt="icon" src="/assets/icons/online.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Total Collections"
            total="..."
            color="info"
            icon={<img alt="icon" src="/assets/icons/collection.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <MachineCard
            title="Item Despensed"
            total="..."
            color="error"
            icon={<img alt="icon" src="/assets/icons/items.png" />}
          />
        </Grid>
        </Stack>
      </Grid>
      </Grid>
    
      {/* <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid> */}

    
    </Container>
  );
}
