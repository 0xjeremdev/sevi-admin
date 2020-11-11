import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import Popover, { PLACEMENT } from "components/Popover/Popover";
import { useQuery, gql } from "@apollo/client";
import Select from "components/Select/Select";
import Notification from "components/Notification/Notification";
import { AuthContext } from "context/auth";
import { STAFF_MEMBERS, SETTINGS } from "settings/constants";
import { NotificationIcon } from "assets/icons/NotificationIcon";
import { AlertDotIcon } from "assets/icons/AlertDotIcon";
import { ArrowLeftRound } from "assets/icons/ArrowLeftRound";
import { MenuIcon } from "assets/icons/MenuIcon";
import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  ProfileImg,
  Image,
  AlertDot,
  NotificationIconWrapper,
  UserDropdowItem,
  NavLink,
  LogoutBtn,
  DrawerIcon,
  CloseButton,
  DrawerWrapper,
  SelectWrapper,
} from "./Topbar.style";
import Logoimage from "assets/image/PickBazar.png";
import UserImage from "assets/image/user.jpg";
import { useDrawerDispatch } from "context/DrawerContext";
import { useWalletDispatch, useWalletState } from "context/WalletContext";
import Drawer, { ANCHOR } from "components/Drawer/Drawer";
import Sidebar from "../Sidebar/Sidebar";

const data = [
  {
    title: "Delivery Successful",
    time: "5m",
    message: "Order #34567 had been placed",
  },
];

const GetWallet = gql`
  query {
    walletOverview {
      walletID
      wallet {
        account
      }
    }
  }
`;

const Topbar = ({ refs }: any) => {
  const wallet_dispatch = useWalletDispatch();
  const currentWallet = useWalletState("currentWallet");
  const setWallet = useCallback(
    (account) => {
      wallet_dispatch({
        type: "SET_WALLET",
        data: account,
      });
    },
    [wallet_dispatch]
  );
  const wallet_data = useQuery(GetWallet, {
    onCompleted: (data) => {
      setWallet(data.walletOverview[0].wallet.account);
    },
  });

  let accountOptions = [];
  if (wallet_data.data) {
    accountOptions = wallet_data.data.walletOverview.map((item) => {
      return { value: item.wallet.account, label: item.wallet.account };
    });
  }
  const handleWalletAccount = ({ value }) => {
    setWallet(value[0].value);
  };
  const dispatch = useDrawerDispatch();
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "PRODUCT_FORM" }),
    [dispatch]
  );

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="pickbazar-admin" />
        </Link>
      </Logo>

      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: "1",
              },
            },
            DrawerBody: {
              style: {
                marginRight: "0",
                marginLeft: "0",
                "@media only screen and (max-width: 767px)": {
                  marginLeft: "30px",
                },
              },
            },
            DrawerContainer: {
              style: {
                width: "270px",
                "@media only screen and (max-width: 767px)": {
                  width: "80%",
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        Wallet :
        <SelectWrapper>
          <Select
            options={accountOptions}
            labelKey="label"
            valueKey="value"
            placeholder=""
            value={{ value: currentWallet, label: currentWallet }}
            searchable={false}
            onChange={handleWalletAccount}
            clearable={false}
          />
        </SelectWrapper>
        <Button onClick={openDrawer}>Add Products</Button>
        <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: "330px",
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <NotificationIcon />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>
        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <NavLink to={STAFF_MEMBERS} exact={false} onClick={close}>
                Staff
              </NavLink>
              <NavLink to={SETTINGS} exact={false} onClick={close}>
                Settings
              </NavLink>
              <LogoutBtn
                onClick={() => {
                  signout();
                  close();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: "220px",
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <ProfileImg>
            <Image src={UserImage} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
