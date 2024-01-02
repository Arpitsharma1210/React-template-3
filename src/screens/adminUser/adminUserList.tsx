import React, { useState } from 'react';
import { Container, ListHeader } from "../../components";
import { brand } from '../../theme/style.palette';
import { Modal, Typography } from '@mui/material';
import { fontSize } from '../../theme/style.typography';
import messages from '../../messages';
import { AdminUserList, Id, MetaData, PaginatedEntity, getDefaultMetaData } from '../../models';
import { ADMIN_USERS } from '../../redux/actions';
import { ADMIN_FILTER } from '../../api';
import { usePagination } from '../../hooks';
import Table from '../../components/table';
import AdminUserForm from './adminUserForm';
import moment from 'moment';
import AdminUserAction, { UserActionConfig, UserActionType } from './adminUserAction';
import { StyledStatusCta } from '../company/styles';


const getDefaultAdminUserFilter = (): MetaData<AdminUserList> => ({
    ...getDefaultMetaData<AdminUserList>(),
    limit: 20,
    order: 'name' as any
});

const paginatedData: PaginatedEntity = {
    key: 'adminUsers',
    name: ADMIN_USERS,
    api: ADMIN_FILTER,
};

interface FormConfig {
    visibility: boolean;
    isUpdate: boolean;
    adminUserId: Id
}


const AdminUsers = () => {

    const {
        entity: adminUsers,
        updateFilters,
        applyFilters,
        resetFilters,
        connectFilter,
        loadMore,
    } = usePagination<AdminUserList>(
        paginatedData,
        getDefaultAdminUserFilter(),
    );

    const [formConfig, setFormConfig] = useState<FormConfig>({
        visibility: false,
        isUpdate: false,
        adminUserId: null
    });

    const updateFromConfig = (data: Partial<FormConfig>) => {
        setFormConfig((prevData) => ({
            ...prevData,
            ...data
        }))
    }

    const resetFromConfig = () => {
        setFormConfig({
            visibility: false,
            isUpdate: false,
            adminUserId: null
        })
    }

    const [userActionConfig, setUserActionConfig] = useState<UserActionConfig>({
        visibility: false,
        type: null,
        adminUserId: null
    });

    const updateUserActionConfig = (data: Partial<UserActionConfig>) => {
        setUserActionConfig((prevData) => ({
            ...prevData,
            ...data
        }))
    }

    const resetUserActionConfig = () => {
        setUserActionConfig({
            visibility: false,
            type: null,
            adminUserId: null
        })
    }

    return (
        <Container>
            <ListHeader
                heading={messages.adminUser.heading}
                ctaLabel={messages.adminUser.addCta}
                handleCtaClick={() => {
                    updateFromConfig({ visibility: true })
                }}
                connectFilter={connectFilter}
                updateFilters={(filterParams: any) => {
                    updateFilters(filterParams);
                    applyFilters();
                }}
            />
            <Table
                data={adminUsers.records}
                metadata={adminUsers.metadata}
                loadMore={loadMore}
                disableSorting={['status']}
                loadMoreCta={messages.adminUser.listing.loadMore.replace('{limit}', adminUsers.metadata.limit)}
                actions={[
                    {
                        id: "revokeInvitation",
                        label: messages.adminUser.listing.actionItems.revokeInvitation,
                        onClick: (row: AdminUserList) => {
                            updateUserActionConfig({
                                visibility: true,
                                type: UserActionType.REVOKE_INVITATION,
                                adminUserId: row?.id
                            })
                        },
                        renderAction: (row: AdminUserList) => !!row?.hasTemporaryPassowrd
                    },
                    {
                        id: "resendInvitation",
                        label: messages.adminUser.listing.actionItems.resendInvitation,
                        onClick: (row: AdminUserList) => {
                            updateUserActionConfig({
                                visibility: true,
                                type: UserActionType.RESEND_INVITATION,
                                adminUserId: row?.id
                            })
                        },
                        renderAction: (row: AdminUserList) => !!row?.hasTemporaryPassowrd
                    },
                    {
                        id: "viewUser",
                        label: messages.adminUser.listing.actionItems.viewUser,
                        onClick: (row: AdminUserList) => {
                            updateFromConfig({
                                visibility: true,
                                isUpdate: true,
                                adminUserId: row?.id
                            })
                        }
                    },
                    {
                        id: "deactivateUser",
                        label: messages.adminUser.listing.actionItems.deactivateUser,
                        onClick: (row: AdminUserList) => {
                            updateUserActionConfig({
                                visibility: true,
                                type: UserActionType.DEACTIVATE_USER,
                                adminUserId: row?.id
                            })
                        },
                        renderAction: (row) => {
                            return !row?.hasTemporaryPassowrd && row?.status?.status !== 'INACTIVE'
                        }
                    },
                    {
                        id: "activateUser",
                        label: messages.adminUser.listing.actionItems.activateUser,
                        onClick: (row: AdminUserList) => {
                            updateUserActionConfig({
                                visibility: true,
                                type: UserActionType.ACTIVATE_USER,
                                adminUserId: row?.id
                            })
                        },
                        renderAction: (row) => {
                            return row?.status?.status === 'INACTIVE'}
                    }
                ]}
                updateFilters={(filterParams: any) => {
                    updateFilters(filterParams);
                    applyFilters();
                }}
                specs={[
                    {
                        id: 'name',
                        label: messages.adminUser.listing.name,
                        getValue: (row: AdminUserList) => row,
                        format: (row: AdminUserList) => (
                            <div>
                                <Typography variant='subtitle1'>{`${row?.firstName} ${row?.lastName}`}</Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        fontSize: fontSize.b3,
                                        color: brand.textColourLight
                                    }}
                                >
                                    {row?.email}
                                </Typography>
                            </div>
                        )
                    },
                    {
                        id: 'lastLogin',
                        label: messages.adminUser.listing.lastLogin,
                        format: (lastLogin?: string) => lastLogin ? moment(lastLogin).fromNow() : ''
                    },
                    {
                        id: 'status',
                        label: messages.adminUser.listing.status,
                        getValue: (row: AdminUserList) => row,
                        format: (row: AdminUserList) => {

                            return (row?.status === 'INACTIVE') ? (
                                        <StyledStatusCta status={row?.status}>
                                            {messages?.adminUser?.listing?.userStatus?.inactive}
                                        </StyledStatusCta>
                                    ) : (row?.hasTemporaryPassowrd
                                            ? messages?.adminUser?.listing?.userStatus?.invited
                                            : messages?.adminUser?.listing?.userStatus?.joined
                                    )

                        }
                    },
                ]}
            />
            <Modal
                open={formConfig?.visibility}
                onClose={resetFromConfig}
            >
                <AdminUserForm
                    isUpdate={formConfig?.isUpdate}
                    adminUserId={formConfig?.adminUserId}
                    onCancel={resetFromConfig}
                    onSuccess={() => {
                        resetFilters();
                        resetFromConfig();
                    }}
                />
            </Modal>
            <Modal
                open={userActionConfig?.visibility}
                onClose={resetUserActionConfig}
            >
                <AdminUserAction
                    userActionConfig={userActionConfig}
                    onCancel={resetUserActionConfig}
                    onSuccess={() => {
                        resetFilters();
                        resetUserActionConfig();
                    }}
                />
            </Modal>
        </Container>
    )
}

export default AdminUsers;