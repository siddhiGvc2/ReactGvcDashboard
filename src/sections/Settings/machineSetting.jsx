import { Card } from "@mui/material";
import { Container } from "@mui/system";

// import AdminMachineSetting from "./SettingsComponents/AdminMachineSetting";
import UserMachineSetting from "./SettingsComponents/UserMachineSetting";





export default function MachineSetting(){
    return(
        <Card >
            <Container sx={{marginTop:2,marginBottom:2}} maxWidth='xxl'>
             
                   {/* <AdminMachineSetting/> */}
                   <UserMachineSetting/>
            </Container>
        </Card>
    )
   
}