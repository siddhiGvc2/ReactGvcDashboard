import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function StatusSelection({sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={1}
      direction="column"
      sx={{
    
        px: 5,
        py: 3,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
    

      <Stack spacing={0.5}>
      <div className="mt-4 pb-2 border-bottom-1 Zone ">
        <h5 className="text-primary d-inline CInfo2">Zone</h5>
        <div className="row">
            <div className="col-12 d-flex">
                <button type='button' className="btn btn-sm btn-success text-white my-auto"><i
                        className="fa fa-check"/></button>
                <select className="form-control"  name="zone" multiple />
                
                <button type='button' className="btn btn-sm btn-danger text-white my-auto" ><i
                        className="fa fa-times"/></button>
            </div>
        </div>
    </div>
        <Typography variant="h4">Siddhi</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          Siddhi
        </Typography>
      </Stack>
    </Card>
  );
}
StatusSelection.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};