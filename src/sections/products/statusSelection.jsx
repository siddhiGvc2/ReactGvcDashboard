import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------





export default function StatusSelection({sx, ...other }) {

    // const statusElement = document.querySelector('[name="status"]');
    // if (statusElement.classList.contains('multiselect-enabled')) {
    //     // Remove multiselect-specific classes and event listeners
    //     statusElement.classList.remove('multiselect-enabled');
    //     statusElement.removeEventListener('change', handleMultiselectChange);
    // }
    
    // // Reinitialize multiselect and trigger change
    // statusElement.classList.add('multiselect-enabled');
    // statusElement.addEventListener('change', handleMultiselectChange);
    // statusElement.dispatchEvent(new Event('change'));


  return (
    <Card
      component={Stack}
      spacing={1}
      direction="column"
      sx={{
    
        px: 1,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
    

      <Stack spacing={0.5}>
            
      <div className="mt-4 pb-2 border-bottom-1">
                    <h5 className="text-primary d-inline">Machine Status</h5>
                    <div className="row">
                        <div className="col-12 d-flex">
                            <select className="form-control" name="status" multiple>
                                <option value="Online" selected>Online</option>
                                <option value="Offline" selected>Offline</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pb-2 border-bottom-1 vending">
                    <h5 className="text-primary d-inline RECD_STATUS1">Stock Status</h5>
                    <div className="row">
                        <div className="col-12 d-flex">
                            <select className="form-control" name="stock_status" multiple>
                                <option value="3">Ok</option>
                                <option value="1">Low</option>
                                <option value="0">Empty</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pb-2 border-bottom-1 incinerator">
                    <h5 className="text-primary d-inline RECD_STATUS2">Burn Status</h5>
                    <div className="row">
                        <div className="col-12 d-flex">
                            <select className="form-control" name="burn_status" multiple>
                                <option value="0">Idle</option>
                                <option value="1">Burning</option>
                                <option value="2">Error</option>
                            </select>
                        </div>
                    </div>
                </div>
                 <div className="mt-4 pb-2 border-bottom-1">
                    <h5 className="text-primary d-inline RECD_STATUS3">Door Status</h5>
                    <div className="row">
                        <div className="col-12 d-flex">
                            <select className="form-control" name="last_status" multiple>
                                <option value="0">Door Open</option>
                                <option value="1">Door Close</option>
                                <option value="2">Door Forced Open</option>
                            </select>
                        </div>
                    </div>
                </div>
      
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