


export default function SuperAdminMachineSetting(){
    return(

        <div className="row" id="container">
        <div className="col-lg-12">
           
              <div>
                <div>
                  <div>
                  <div className="container" >
                            <div className="row "  style={{display: 'flex'}}>
                                  <div className="row col-lg-6"  style={{display:'flex'}}>
                                         <div className="col-md-4 col-lg-4 mr-2">
                                              <div className="form-group my-2">
                                              
                                                  <input  placeholder="Serial Number *" type="text" className="form-control" name="machineID"  />
                                                  <div className="invalid-feedback" />
                                              </div>
                                      
                                          </div>
                                          <div className="col-md-2 col-lg-2">
                                              <div className="form-group my-2 ">
                                              <button type="button" className="btn btn-success text-white" >GET</button>
                                              </div>
                                          
                                              
                                          </div>
                                          </div>
                                        <div className="row col-lg-6"  style={{display:'flex'}}>
                                          
                                          <div className="col-md-3 col-lg-4 mr-2 ml-0">
                                              <div className="form-group my-2">
                                                  
                                                      <input placeholder="New Serial Number *" type="text" className="form-control" name="newSerialNumber" />
                                                  <div className="invalid-feedback" />
                                              </div>
                                          
                                          </div>
                                          <div className="col-md-2 col-lg-2">
                                                  <div className="form-group my-2 ">
                                                  <button type="button" className="btn btn-primary text-white" >SET</button>
                                              </div>
                                          </div>
                                   </div>
                                      <div className="row"   style={{display: 'flex'}}>
                                      
                                          <div className="col-md-7 mr-2 ml-0">
                                              <div className="form-group my-2">
                                              
                                                  <div  style={{display: 'flex'}}>
                                                      <p  style={{width:'200px'}}>SetSerialCounts:</p>
                                                      <p className="setSerialCounts" style={{width:'200px'}}>0 / 0</p>
                                                  </div>
                                                  <div className="invalid-feedback" />
                                              </div>
                                      
                                          </div>
                                      
                                      </div>
                                      
                                          
                                      
                                  </div>
                                  <div className="modal-footer" />

                                       <div className="mt-1">
                                      <div className="container mt-0" style={{display: 'grid', gridTemplateColumns:'repeat(3,1fr)'}}>
                                          
                                      <div className="row mr-0 ml-0">
                                          <div className="col-md-4 ml-0 mr-0" >
                                              <div className="form-group my-2">
                                              
                                                  <input  placeholder="Price" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="price" />
                                                  <div className="invalid-feedback" />
                                              </div>
                                          </div>
                                          <div className="col-md-5">
                                              <div className="form-group my-2 ">
                                              <button type="button" className="btn btn-primary"  >SET PRICE</button>
                                              </div>
                                          </div>
                                      
                                      </div>
                                      <div className="row">
                                              <div className="col-md-7">
                                                  <div className="form-group my-2">
                                                  
                                                      <input type="text" placeholder="Model Name" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="modelName" />
                                                  
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-5 ">
                                                  <div className="form-group my-2 ">
                                                  <button type="button" className="btn btn-primary" >SET NAME</button>
                                                  </div>
                                              </div>
                                          
                                          </div>
                                          <div className="row">
                                              <div className="col-md-7">
                                                  <div className="form-group my-2">
                                                  
                                                      <input type="text" placeholder="Model" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="model" />
                                                  
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-5 ">
                                                  <div className="form-group my-2 ">
                                                  <button type="button" className="btn btn-primary" onClick="setModel()" >SET MODEL</button>
                                                  </div>
                                              </div>
                                          
                                          </div>
                                     </div>
                                  </div>

                           </div>
                           
                           <div   className="mt-2" style={{padding:'10px'}} >
                              <div>
                                  <div >
                                      <div className="modal-header">
                                          <h5 className="modal-title">Temperature</h5>
                                          <button type="button" className="btn btn-warning  text-white" >SET TEMPERATURE</button>
                                      </div>
                                      <div className="modal-body">
                                          <div className="row">
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Min Temp warning" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="minTempA" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Max Temp Secondary" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="maxTempA" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Min Temp Primary" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="minTempB" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-3">
                                                  <div className="form-group my-2">
                                                  
                                                  <input placeholder="Max Temp Primary" type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0" name="maxTempB" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  
                                  </div>
                              </div>
                          </div>
                       
                          <div style={{marginTop: '-10px',padding:'10px'}} className="m-2">
                              <div   >
                                  <div >
                                      <div className="modal-header mt-0" >
                                          <h5 className="modal-title">Incinerator</h5>
                                          <button type="button" className="btn btn-info text-white" >SET INCINERATOR</button>
                                      </div>
                                      <div className="modal-body">
                                          <div className="row" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)'}}>
                                              <div className="col-md-10">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Door Count For Auto Burning" type="text" className="form-control" name="maxDoorCount" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-10">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Maximum Burning Time" type="text" className="form-control" name="maxBurningTime" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                              <div className="col-md-10">
                                                  <div className="form-group my-2">
                                                  
                                                      <input placeholder="Auto Burn Time" type="text" className="form-control" name="alarmTime" />
                                                      <div className="invalid-feedback" />
                                                  </div>
                                              </div>
                                          
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>

                       



                  </div>
               </div>
            </div>
         
      </div>
  
  </div>

    )
}