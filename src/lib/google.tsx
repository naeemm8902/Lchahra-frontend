/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { Button, Col, FlexboxGrid, Toggle } from 'rsuite';
import { useTheme } from 'styled-components';
import { TYPES_TOOLS } from '../../../actions/toolsActions';
import { TYPES_OF_SOCIAL_NETWORKS } from '../../../lib/globalValues';
import {
  CLIENT_ID,
  COOKIE_POLICY,
  SCOPE_BUSINESS,
} from '../../../lib/initGoogle';
import { notification, notificationError } from '../../../lib/notification';
import { assignTool } from '../../../services/assignTool';
import { disableTool } from '../../../services/disableTool';
import {
  getAccountsGoogleBusiness,
  getCompaniesOfAccountGoogleBusiness,
} from '../../../services/googleBusinessTools';
import { getToolsCompanyObj } from '../../../services/getToolsCompany';
import ModalTools from '../../modals/modalTools/ModalTools';
import {
  ButtonAdd,
  ButtonContainer,
  CardPage,
  Container,
  NoAccount,
} from '../Toogle.styles';

interface OptionsModal {
  locations: Location[];
  accounts: {
    accountName: string;
    name: string;
    profileImageUrl?: string;
  }[];
  pageDetails?: {
    name: string;
    title: string;
    categoryName: string;
    categoryDisplayName: string;
  };
}

interface Location {
  name: string;
  title: string;
  categories: Categories;
}

interface Categories {
  primaryCategory: PrimaryCategory;
}

interface PrimaryCategory {
  name: string;
  displayName: string;
  serviceTypes: ServiceType[];
  moreHoursTypes: MoreHoursType[];
}

interface MoreHoursType {
  hoursTypeId: string;
  displayName: string;
  localizedDisplayName: string;
}

interface ServiceType {
  serviceTypeId: string;
  displayName: string;
}

interface Props {
  companyId?: number;
  dispatchTool: any;
  stateTool: any;
  invalidateQuery?: () => void;
  signup?: boolean;
  newFormat?: boolean;
  onClick?: () => void;
  clickedSocial?: string;
  socialNetworkPages?: {
    facebook: boolean;
    google: boolean;
    instagram: boolean;
    twitter: boolean;
    tiktok: boolean;
  };
  updateParentPages?: () => Promise<void>;
}
interface GoogleToogleRef {
  handleClick: () => void;
}
const GoogleBusinessToggle = forwardRef<GoogleToogleRef, Props>(
  (
    {
      companyId,
      dispatchTool,
      stateTool,
      invalidateQuery,
      signup = false,
      newFormat = false,
      onClick,
      clickedSocial,
      socialNetworkPages,
      updateParentPages,
    }: Props,
    ref,
  ) => {
    const theme = useTheme();

    const [dataModal, setDataModal] = useState<OptionsModal | null>(null);
    const [gmailDataModal, setGmailDataModal] = useState<any | null>(null);
    const [dataModalArray, setDataModalArray] = useState<string[]>([]);
    const [switchData, setSwitchData] = useState<[] | null>(null);

    const [googleTokenAndUserId, setGoogleTokenAndUserId] = useState({
      credentials: '',
      accountId: '',
    });

    const activated =
      stateTool[TYPES_OF_SOCIAL_NETWORKS.GOOGLE]?.enabled === true;

    const handleLoginGoogle = async ({ code }: any) => {
      if (!code) {
        notificationError({
          title: 'Error',
          description: 'Could not authenticate this account',
        });
      } else {
        const { data } = await getAccountsGoogleBusiness(code);

        if (data) {
          setGoogleTokenAndUserId({
            ...googleTokenAndUserId,
            credentials: data.credentials,
          });
          setGmailDataModal(data?.accounts[0]);
          setDataModal(data);
        }
      }
    };

    const handleAccount = async (accountId: string) => {
      const { data } = await getCompaniesOfAccountGoogleBusiness({
        tokenId: accountId,
        credentials: googleTokenAndUserId.credentials,
      });

      setGoogleTokenAndUserId({
        ...googleTokenAndUserId,
        accountId,
      });

      if (data) {
        // console.log('data', data);
        setDataModal(data);
      }
    };

    const handleShowLocations = async () => {
      const { data: dataTools } = await getToolsCompanyObj(companyId);
      setSwitchData(dataTools.google);
    };

    const handleSelectBusiness = async (page: any) => {
      // console.log('page | handleSelectBusiness', page);

      const matchedBusiness = page.pageDetails.find((detail: any) =>
        detail.name.includes(page.pageId),
      );

      // console.log('matchedBusiness', matchedBusiness);

      const defaultSelectContent = [
        {
          type: TYPES_OF_SOCIAL_NETWORKS.GOOGLE,
          accessToken: page.accessToken,
          pageId: page.pageId,
          userId: page.userId,
          enabled: true,
          id: page.id,
          profilePic: gmailDataModal?.profileImageUrl,
          pageDetails: matchedBusiness,
        },
      ];

      if (companyId) {
        const { data } = await assignTool({
          companyId,
          tool: defaultSelectContent,
        });

        dispatchTool({
          type: TYPES_TOOLS.ACTIVATE_GOOGLE,
          payload: data[0],
        });
        setSwitchData(null);
      }
    };

    const assignAccount = async (locationId: string, location: any) => {
      setDataModalArray((prev) => [...prev, locationId]);

      const defaultContent = [
        {
          type: TYPES_OF_SOCIAL_NETWORKS.GOOGLE,
          pageId: locationId,
          accessToken: googleTokenAndUserId.credentials,
          userId: googleTokenAndUserId.accountId,
          pageName: `${location.title} - ${location.categories.primaryCategory.displayName}`,
          enabled: dataModalArray.length === 0,
          profilePic: gmailDataModal?.profileImageUrl,
          pageDetails: dataModal ? dataModal.pageDetails : {},
        },
      ];

      // console.log('object |defaultContent', defaultContent);

      if (companyId) {
        const { data } = await assignTool({
          companyId,
          tool: defaultContent,
        });
        if (data && data[0] && dataModalArray.length === 0) {
          dispatchTool({
            type: TYPES_TOOLS.ACTIVATE_GOOGLE,
            payload: data[0],
          });
        }
        // console.log('update parent pages', updateParentPages);
        if (typeof updateParentPages === 'function') {
          try {
            // console.log('inside try');
            await updateParentPages();
          } catch (error) {
            // console.error('Error updating parent pages:', error);
          }
        }
        notification({
          type: 'success',
          title: 'Success',
          description:
            dataModalArray.length === 0
              ? 'Google business was enabled'
              : 'Google business was added',
        });
      } else {
        dispatchTool({
          type: TYPES_TOOLS.ACTIVATE_GOOGLE,
          payload: defaultContent[0],
        });
      }
      invalidateQuery?.();
    };

    const { signIn } = useGoogleLogin({
      cookiePolicy: COOKIE_POLICY,
      scope: SCOPE_BUSINESS,
      clientId: CLIENT_ID,
      onSuccess: handleLoginGoogle,
      onFailure: (err: any) =>
        notificationError({
          title: 'Error',
          description: err?.error || 'Could not get user info from Google',
        }),
      responseType: 'code',
    });
    useImperativeHandle(
      ref,
      () => ({
        handleClick: () => {
          if (clickedSocial === 'GOOGLE') {
            try {
              signIn();
            } catch (error) {
              notificationError({
                title: 'Error',
                description: 'Failed to initiate Google sign-in',
              });
            }
          }
        },
      }),
      [signIn],
    );
    // const wid = newFormat ? '69%' : '100%';
    // const gp = newFormat ? '8px' : '0px';

    // console.log('object | dataModal', dataModal?.accounts);

    return (
      <>
        {dataModal && (
          <ModalTools
            setDataModal={setDataModal}
            dataModal={dataModal}
            setDataModalArray={setDataModalArray}
            title="Connect Google Business"
            description={
              dataModal.accounts
                ? 'Select google account'
                : 'Select google businesses'
            }
          >
            {dataModal?.accounts && (
              <div>
                {dataModal?.accounts && (
                  <div>
                    {dataModal?.accounts?.length > 0 ? (
                      <>
                        {dataModal.accounts.map((account) => {
                          const [accountId] = account.name.split('/').reverse();
                          const isAssigned = dataModalArray.includes(accountId);
                          return (
                            <CardPage
                              align="middle"
                              justify="space-around"
                              key={accountId}
                            >
                              <FlexboxGrid.Item>
                                <img
                                  className="profile-img"
                                  src={account.profileImageUrl}
                                  alt={account.accountName}
                                />
                                <span>{account.accountName}</span>
                              </FlexboxGrid.Item>
                              <FlexboxGrid.Item>
                                {/* <Button
                                  onClick={(event: React.SyntheticEvent) => {
                                    event.stopPropagation();
                                    handleAccount(accountId);
                                  }}>
                                  Add
                                </Button> */}
                                <Toggle
                                  disabled={isAssigned}
                                  checked={isAssigned}
                                  onChange={(checked, event) => {
                                    handleAccount(accountId);
                                    event.stopPropagation();
                                    setDataModalArray((prev) =>
                                      checked
                                        ? [...prev, accountId]
                                        : prev.filter((id) => id !== accountId),
                                    );
                                  }}
                                  style={{
                                    backgroundColor: isAssigned
                                      ? '#dd2256'
                                      : '#cccccc',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                />
                              </FlexboxGrid.Item>
                            </CardPage>
                          );
                        })}
                      </>
                    ) : (
                      <NoAccount>No Google Business Page found</NoAccount>
                    )}
                  </div>
                )}
              </div>
            )}

            {dataModal?.locations && (
              <div>
                {dataModal.locations.map((location) => {
                  const [locationId] = location.name.split('/').reverse();
                  const isDisabled = dataModalArray.includes(locationId);
                  const isAssigned = dataModalArray.includes(locationId); // Use the same array for toggle state

                  return (
                    <CardPage
                      align="middle"
                      justify="space-around"
                      key={locationId}
                    >
                      <FlexboxGrid.Item componentClass={Col} xs={20}>
                        <span>
                          {location.title} -{' '}
                          {location.categories.primaryCategory.displayName}
                        </span>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item componentClass={Col} xs={4}>
                        {/* <Button
                          disabled={isDisabled}
                          onClick={(event: React.SyntheticEvent) => {
                            event.stopPropagation();
                            assignAccount(locationId, location);
                          }}>
                          Add
                        </Button> */}
                        <Toggle
                          disabled={isDisabled}
                          checked={isAssigned}
                          onChange={(
                            checked: boolean,
                            event: React.SyntheticEvent,
                          ) => {
                            event.stopPropagation();
                            assignAccount(locationId, location);
                          }}
                          style={{
                            backgroundColor: isAssigned ? '#dd2256' : '#cccccc',
                            transition: 'background-color 0.3s ease',
                          }}
                        />
                        ;
                        {/* <Toggle
                          checked={!isDisabled2}
                          onChange={(checked, event) => {
                            event.stopPropagation();
                            if (checked) {
                              assignAccount(locationId, location);
                            }
                          }}
                          disabled={isDisabled2}
                          style={{
                            backgroundColor: !isDisabled2
                              ? '#dd2256'
                              : '#cccccc',
                            transition: 'background-color 0.3s ease',
                          }}
                        /> */}
                      </FlexboxGrid.Item>
                    </CardPage>
                  );
                })}
              </div>
            )}
          </ModalTools>
        )}

        {switchData && (
          <ModalTools
            setDataModal={setSwitchData}
            dataModal={switchData}
            title="Switch Google Business"
            description="Select the Google business to switch to"
          >
            <div>
              {switchData?.map((page: any) => {
                return (
                  <CardPage align="middle" key={page.pageId}>
                    <FlexboxGrid.Item componentClass={Col} xs={20}>
                      <span>{page.pageName}</span>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item xs={4} componentClass={Col}>
                      {/* <Button
                        disabled={page.enabled}
                        onClick={(event: React.SyntheticEvent) => {
                          event.stopPropagation();
                          handleSelectBusiness(page);
                        }}>
                        {page.enabled ? 'Activated' : 'Activate'}
                      </Button> */}
                      <Toggle
                        checked={page.enabled}
                        onChange={(
                          checked: boolean,
                          event: React.SyntheticEvent,
                        ) => {
                          event.stopPropagation();
                          if (!checked) {
                            handleSelectBusiness(page);
                          }
                        }}
                        disabled={page.enabled}
                        style={{
                          backgroundColor: page.enabled ? '#dd2256' : '#cccccc',
                          transition: 'background-color 0.3s ease',
                        }}
                      />
                    </FlexboxGrid.Item>
                  </CardPage>
                );
              })}
            </div>
          </ModalTools>
        )}
        {signup ? (
          <>
            {activated && (
              <Container
                style={{
                  // display: 'flex',
                  // flexDirection: signup ? 'column' : 'row', // Stack buttons vertically if signup is true
                  justifyContent: signup ? 'end' : 'space-between',
                  // alignItems: 'center',
                  // padding: signup ? '20px' : '10px',
                  // borderRadius: signup ? '10px' : '0',
                  // width: signup ? '20%' : '100%', // Set width to 40% when signup is true
                  // margin: '0 auto', // Center the container
                  // gap: signup ? '10px' : '0', // Add gap between buttons in column layout
                }}
              >
                <ButtonAdd
                  bgColor={signup ? '#fff' : theme.colors.grey} // Set background color based on signup
                  onClick={handleShowLocations}
                >
                  Switch
                </ButtonAdd>
                <ButtonAdd
                  // bgColor={theme.colors.red}
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                    disableTool(
                      stateTool[TYPES_OF_SOCIAL_NETWORKS.GOOGLE].id,
                    ).then(() => {
                      dispatchTool({ type: TYPES_TOOLS.DEACTIVATE_GOOGLE });
                      invalidateQuery?.();
                    });
                    // .catch(error => {
                    //   console.log('Error:', error);
                    // });
                  }}
                  style={{
                    width: signup ? '120px' : 'auto',
                    color: signup ? '#64E000' : 'inherit',
                    fontSize: signup ? '14px' : 'inherit', // Set font size based on signup condition
                    fontFamily: signup ? "'Inter', sans-serif" : 'inherit', // Set the font family
                    padding: signup ? '2px 15px' : 'inherit',
                  }}
                >
                  Connected
                </ButtonAdd>
              </Container>
            )}

            {!activated && (
              <ButtonContainer signup={signup}>
                <ButtonAdd
                  bgColor={signup ? theme.colors.red : theme.colors.grey}
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                    signIn();
                  }}
                  pad={!activated ? '8px 12px' : '8px 4px'}
                  signup={signup}
                >
                  Connect
                </ButtonAdd>
              </ButtonContainer>
            )}
          </>
        ) : (
          <>
            {activated && (
              <Container
                style={{
                  display: 'flex',
                  flexDirection: signup ? 'column' : 'row', // Stack buttons vertically if signup is true
                  justifyContent: signup ? 'center' : 'space-between',
                  alignItems: 'center',
                  padding: signup ? '20px' : 'inherit',
                  borderRadius: signup ? '10px' : 'inherit',
                  width: signup ? '20%' : '', // Set width to 40% when signup is true
                  gap: signup ? '10px' : '5px', // Add gap between buttons in column layout
                }}
              >
                <>
                  {activated && socialNetworkPages?.google && (
                    <ButtonAdd
                      pad={!activated ? '8px 12px' : ''}
                      bgColor={signup ? 'black' : theme.colors.crimson}
                      onClick={(event: React.SyntheticEvent) => {
                        event.stopPropagation();
                        handleShowLocations();
                      }}
                    >
                      Switch
                    </ButtonAdd>
                  )}
                </>
                <ButtonAdd
                  bgColor={theme.colors.crimson}
                  pad={!activated ? '8px 12px' : ''}
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                    disableTool(
                      stateTool[TYPES_OF_SOCIAL_NETWORKS.GOOGLE].id,
                    ).then(() => {
                      dispatchTool({ type: TYPES_TOOLS.DEACTIVATE_GOOGLE });
                      invalidateQuery?.();
                    });
                    // .catch(error => {
                    //   console.log('Error:', error);
                    // });
                  }}
                  style={{
                    width: signup ? '120px' : '',
                  }}
                >
                  Disconnect
                </ButtonAdd>
              </Container>
            )}

            {!activated && (
              <ButtonContainer signup={signup}>
                <ButtonAdd
                  bgColor={theme.colors.grey}
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                    signIn();
                  }}
                  pad={!activated ? '8px 12px' : '8px 4px'}
                  signup={signup}
                >
                  Connect
                </ButtonAdd>
              </ButtonContainer>
            )}
          </>
        )}
        {/* <Toggle
        checked={activated}
        onChange={(check: boolean) =>
          check
            ? signIn()
            : disableTool(stateTool[TYPES_OF_SOCIAL_NETWORKS.GOOGLE].id).then(
                () => {
                  dispatchTool({ type: TYPES_TOOLS.DEACTIVATE_GOOGLE });
                  invalidateQuery?.();
                },
              )
        }
      /> */}
      </>
    );
  },
);

export default GoogleBusinessToggle;
