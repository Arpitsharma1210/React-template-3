import React from "react";
import { Container} from "../../components";
import messages from "../../messages";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Table from "../../components/table";
import { getDefaultMetaData } from "../../models";



const Dashboard = () => {

    return (
        <Container
        >
            {/* <Table
                data={[
                    {
                        name: "John Doe",
                        lastLogin: "12/12/2020",
                        status: "Active",
                        id: 1
                    }
                ]}
                metadata={getDefaultMetaData()}
                // loadMore={loadMore}
                // disableSorting={['status']}
                actions={[
                    {
                        id: "resendInvitation",
                        label: "Resend Invitation",
                        onClick: (row:any) => {
                            
                        }
                    },
                    {
                        id: "viewUser",
                        label: 'View User',
                        onClick: (row: any) => {
                         
                        }
                    }
                ]}
                // updateFilters={(filterParams: any) => {
                //     updateFilters(filterParams);
                //     applyFilters();
                // }}
                specs={[
                    {
                        id: 'name',
                        label: "Name",
                    
                    },
                    {
                        id: 'lastLogin',
                        label: "Last Login"
                    },
                    {
                        id: 'status',
                        label: "Status",
                       
                    },
                ]}
            /> */}
        </Container>
    )
}

export default Dashboard;