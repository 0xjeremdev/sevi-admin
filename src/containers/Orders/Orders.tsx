import React, { useState, useCallback } from "react";
import {
  // styled,
  withStyle,
  // createThemedUseStyletron,
  useStyletron,
} from "baseui";
import ReactJson from "react-json-view";
import dayjs from "dayjs";
import { Grid, Row as Rows, Col as Column } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import ChevronDown from "baseui/icon/chevron-down";
import ChevronRight from "baseui/icon/chevron-right";
import { Button } from "baseui/button";
// import Input from "components/Input/Input";
import { useWalletState, useWalletDispatch } from "context/WalletContext";
import { useQuery, gql } from "@apollo/client";
import { Wrapper, Header, Heading } from "components/Wrapper.style";
import Checkbox from "components/CheckBox/CheckBox";
import { useDrawerDispatch } from "context/DrawerContext";
import { Tag } from "baseui/tag";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from "./Orders.style";
import NoResult from "components/NoResult/NoResult";

const GET_ORDERS = gql`
  query($limit: Int, $status: OrderStatusEnum) {
    orders(limit: $limit, status: $status) {
      _id
      affiliate {
        _id
        profile {
          countrycode
          documentID
          name
          phonenumber
          userPhoto
        }
      }
      delivery {
        address
        deliveryType
        location {
          lat
          lon
        }
      }
      deliveryFee
      groupDetails {
        name
        users {
          _id
          profile {
            countrycode
            documentID
            name
            phonenumber
            userPhoto
          }
        }
      }
      paymentType
      phonenumber
      products {
        _id
        categories {
          primary
          subCategory
          type
        }
        created
        quantity
        price
        name
        description
      }
      status
      notes
      subTotal
      userDetails {
        _id
        profile {
          countrycode
          name
          documentID
          phonenumber
          countrycode
        }
      }
    }
  }
`;

type CustomThemeT = { red400: string; textNormal: string; colors: any };
// const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

// const Status = styled("div", ({ $theme }) => ({
//   ...$theme.typography.fontBold14,
//   color: $theme.colors.textDark,
//   display: "flex",
//   alignItems: "center",
//   lineHeight: "1",
//   textTransform: "capitalize",

//   ":before": {
//     content: '""',
//     width: "10px",
//     height: "10px",
//     display: "inline-block",
//     borderTopLeftRadius: "10px",
//     borderTopRightRadius: "10px",
//     borderBottomRightRadius: "10px",
//     borderBottomLeftRadius: "10px",
//     backgroundColor: $theme.borders.borderE6,
//     marginRight: "10px",
//   },
// }));

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px)": {
    alignItems: "center",
  },
}));

const statusSelectOptions = [
  { value: "DELIVERED", label: "Delivered", id: "1" },
  { value: "PENDING", label: "Pending", id: "2" },
  { value: "SHIPPED", label: "Shipped", id: "3" },
  { value: "CANCELLED", label: "Cancelled", id: "4" },
  { value: "REFUNDED", label: "Refunded", id: "5" },
  { value: "RETURNED", label: "Returned", id: "6" },
  { value: "DISPUTED", label: "Disputed", id: "7" },
  { value: "AWAITING_KYC", label: "Awaiting KYC", id: "8" },
  { value: "AWAITING_FULFILLMENT", label: "Awaiting Fullfillment", id: "9" },
  { value: "AWAITING_SHIPMENT", label: "Awaiting Shipment", id: "10" },
];

const limitSelectOptions = [
  { value: 7, label: "Last 7 orders" },
  { value: 15, label: "Last 15 orders" },
  { value: 30, label: "Last 30 orders" },
];

function TableRow(data: any) {
  const [css] = useStyletron();
  // const [useCss, theme] = themedUseStyletron();
  const [expanded, setExpanded] = React.useState(false);
  const drawerDispatch = useDrawerDispatch();
  console.log(data);
  const openDrawer = React.useCallback(() => {
    drawerDispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "ORDER_UPDATE_FORM",
      data: data.data,
    });
  }, [drawerDispatch, data]);
  // const completed = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: theme.colors.primary,
  //   },
  // });
  // const cancelled = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: theme.colors.red400,
  //   },
  // });
  // const pending = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: theme.colors.textNormal,
  //   },
  // });
  // const delivered = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: theme.colors.blue400,
  //   },
  // });
  // const returned = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: "rgb(100,0,0,)",
  //   },
  // });
  // const refunded = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: "rgb(100,100,0,)",
  //   },
  // });

  enum OrderStatusEnum {
    // Pre-delivery
    PENDING = "pending", // buyer
    AWAITING_KYC = "awaiting KYC", // buyer
    AWAITING_FULFILLMENT = "awaiting fulfillment", // partner
    CANCELLED = "cancelled", // partner

    // Delivery
    AWAITING_SHIPMENT = "awaiting shipment", // partner
    SHIPPED = "shipped", // partner
    DELIVERED = "delivered", // agent

    // Post-delivery-order
    REFUNDED = "refunded", // partner
    DISPUTED = "disputed", // buyer
    RETURNED = "returned", // buyer

    // Post-delivery-payment
    DEFAULTED = "defaulted", // buyer did not pay in 90 days.
    SPECIAL_ATTENTION = "defaulted", // buyer after 14 days to late.
    LATE_PAY = "late pay", // buyer after 7 days to late.
    COMPLETED = "completed", // buyer repaid in full.
    ARCHIVED = "archived", // buyer repaid in full.
  }

  function statusToTagKind(status: OrderStatusEnum) {
    switch (status) {
      case OrderStatusEnum.PENDING: {
        return "primary";
      }
      case OrderStatusEnum.AWAITING_KYC: {
        return "positive";
      }
      case OrderStatusEnum.COMPLETED: {
        return "negative";
      }
      default: {
        return "neutral";
      }
    }
  }

  console.log(" data.data:", data.data);
  return (
    <React.Fragment>
      <div role="row" className={css({ display: "contents" })}>
        <StyledCell>
          <Button
            size="compact"
            kind="minimal"
            onClick={() => setExpanded(!expanded)}
            shape="square"
          >
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </Button>
        </StyledCell>
        <StyledCell onClick={openDrawer}>
          {data.data.userDetails.profile.name}
        </StyledCell>
        <StyledCell style={{ justifyContent: "center" }} onClick={openDrawer}>
          <Tag
            closeable={false}
            variant="outlined"
            kind={statusToTagKind(data.data.status)}
          >
            {data.data.status}
          </Tag>
        </StyledCell>
        <StyledCell onClick={openDrawer}>
          {data.data.userDetails._id}
        </StyledCell>
        <StyledCell onClick={openDrawer}>
          {dayjs(data.data.products[0].created).format("DD MMM YYYY")}
        </StyledCell>
        <StyledCell onClick={openDrawer}>
          {data.data.delivery.address}
        </StyledCell>
        <StyledCell onClick={openDrawer}>
          ${data.data.products[0].price * data.data.products[0].quantity}
        </StyledCell>
        <StyledCell onClick={openDrawer}>{data.data.paymentType}</StyledCell>
        <StyledCell onClick={openDrawer}>{data.data.phonenumber}</StyledCell>

        {expanded && (
          <div
            className={css({
              gridColumn: "span 9",
              padding: "32px 24px",
            })}
          >
            <StyledTable $gridTemplateColumns="max-content auto auto auto">
              <div role="row" className={css({ display: "contents" })}>
                <StyledCell>
                  <ReactJson
                    src={data.data.products}
                    iconStyle="triangle"
                    collapsed={true}
                    name="products"
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    indentWidth={6}
                  />
                  <ReactJson
                    src={data.data.delivery}
                    iconStyle="triangle"
                    collapsed={true}
                    name="delivery"
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    indentWidth={6}
                  />
                  <ReactJson
                    src={data.data.groupDetails}
                    iconStyle="triangle"
                    name="groupDetails"
                    collapsed={true}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    indentWidth={6}
                  />
                  <ReactJson
                    src={data.data.userDetails}
                    iconStyle="triangle"
                    name="userDetails"
                    collapsed={true}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    indentWidth={6}
                  />
                </StyledCell>
              </div>
            </StyledTable>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default function Orders() {
  // const [checkedId, setCheckedId] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const orderUpdated = useWalletState("orderUpdated");
  const wallet_dispatch = useWalletDispatch();
  const setOrderUpdated = useCallback(
    (flag) => {
      wallet_dispatch({
        type: "ORDER_UPDATED",
        data: flag,
      });
    },
    [wallet_dispatch]
  );
  // const [search, setSearch] = useState([]);

  const { data, error, refetch } = useQuery(GET_ORDERS);
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  if (orderUpdated) {
    refetch().then(() => {
      setOrderUpdated(false);
    });
  }
  function handleStatus({ value }) {
    setStatus(value);
    if (value.length) {
      refetch({
        status: value[0].value,
        limit: limit.length ? limit[0].value : null,
      });
    } else {
      refetch({ status: null });
    }
  }

  function handleLimit({ value }) {
    setLimit(value);
    if (value.length) {
      refetch({
        status: status.length ? status[0].value : null,
        limit: value[0].value,
      });
    } else {
      refetch({
        limit: null,
      });
    }
  }

  // function handleSearch(event) {
  //   const { value } = event.currentTarget;
  //   setSearch(value);
  //   refetch({ searchText: value });
  // }
  // function onAllCheck(event) {
  //   if (event.target.checked) {
  //     const idx = data && data.orders.map((order) => order._id);
  //     setCheckedId(idx);
  //   } else {
  //     setCheckedId([]);
  //   }
  //   setChecked(event.target.checked);
  // }

  // function handleCheckbox(event) {
  //   const { name } = event.currentTarget;
  //   if (!checkedId.includes(name)) {
  //     setCheckedId((prevState) => [...prevState, name]);
  //   } else {
  //     setCheckedId((prevState) => prevState.filter((id) => id !== name));
  //   }
  // }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Orders</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={status}
                    searchable={false}
                    onChange={handleStatus}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Select
                    options={limitSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={limit}
                    placeholder="Order Limits"
                    searchable={false}
                    onChange={handleLimit}
                  />
                </Col>

                {/* <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Address"
                    onChange={handleSearch}
                    clearable
                  />
                </Col> */}
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, auto) minmax(150px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>
                  <Checkbox
                    name={""}
                    checked={false}
                    overrides={{
                      Checkmark: {
                        style: {
                          borderTopWidth: "2px",
                          borderRightWidth: "2px",
                          borderBottomWidth: "2px",
                          borderLeftWidth: "2px",
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius: "4px",
                          borderBottomLeftRadius: "4px",
                        },
                      },
                    }}
                  />
                </StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Customer ID</StyledHeadCell>
                <StyledHeadCell>Time</StyledHeadCell>
                <StyledHeadCell>Delivery Address</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Payment Method</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>

                {data ? (
                  data.orders.length ? (
                    data.orders.map((item, index) => (
                      <TableRow data={item} key={index} />
                    ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: "1",
                        gridColumnEnd: "one",
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
