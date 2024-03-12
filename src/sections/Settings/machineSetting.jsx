import { Card } from "@mui/material";
import { Container } from "@mui/system";

import UserMachineSetting from "./SettingsComponents/UserMachineSetting";
import AdminMachineSetting from "./SettingsComponents/AdminMachineSetting";





export default function MachineSetting(){
    return(
        <Card >
            <Container sx={{marginTop:2,marginBottom:2}} maxWidth='xxl'>
             
                   {sessionStorage.getItem("isAdmin")==='true' ?<AdminMachineSetting/>: <UserMachineSetting/>}
                  
            </Container>
        </Card>
    )
   
}