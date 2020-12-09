import React, { useState, useCallback } from "react";
import {
  styled,
  withStyle,
  createThemedUseStyletron,
  useStyletron,
} from "baseui";
import ReactJson from "react-json-view";
import dayjs from "dayjs";
import { Grid, Row as Rows, Col as Column } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import ChevronDown from "baseui/icon/chevron-down";
import ChevronRight from "baseui/icon/chevron-right";
import { Button } from "baseui/button";
import { useWalletState, useWalletDispatch } from "context/WalletContext";
import { useQuery, gql } from "@apollo/client";
import { Wrapper, Header, Heading } from "components/Wrapper.style";
import Checkbox from "components/CheckBox/CheckBox";
import { useDrawerDispatch } from "context/DrawerContext";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from "./Credit.style";
import NoResult from "components/NoResult/NoResult";

const GET_CREDITS = gql`
  query($account: String!) {
    searchCredit(account: $account) {
      total
      hits {
        _id
        status
        agreedDate
        typeID
        type
        repaymentTerm
        totalToPay
        totalPaid
        amount
        installments {
          installmentCount
          status
          startDate
          endDate
          amount
          paymentDone
        }
      }
    }
  }
`;

const dummy_data = [
  {
    _id: "5fd0bf9c60e081819ecac2f8",
    type: "shop order",
    typeID: "lv6wtap1",
    amount: 1302,
    to: {
      account: "uaaabbb",
    },
    from: {
      method: "seviWallet",
      name: "Shop order",
      account: "caaabbb",
    },
    status: "agreed",
    description: "Your Order payment agreements",
    created:
      "Mon Nov 30 2020 14:49:54 GMT+0100 (Central European Standard Time)",
    repaymentDays: 100,
    repaymentTerm: "weekly",
    orderID: "5fbbbd082322970dc71ff999",
    deposit: 260.4,
    total_amount: 1302,
    totalToPay: 1042,
    totalPaid: 261,
    agreedDate: "2020-11-30T13:50:02.514Z",
    installments: [
      {
        installmentCount: 0,
        startDate: null,
        endDate: null,
        amount: 260.4,
        status: "pending",
        paymentDone: null,
      },
      {
        installmentCount: 1,
        endDate: "2021-01-25T13:50:02.514Z",
        startDate: "2021-01-18T13:50:02.514Z",
        status: "pending",
        paymentDone: null,
        amount: 130.2,
      },
    ],
    repaymentDueDate: "2021-03-10T13:50:02.514Z",
  },
];

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Status = styled("div", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: "flex",
  alignItems: "center",
  lineHeight: "1",
  textTransform: "capitalize",

  ":before": {
    content: '""',
    width: "10px",
    height: "10px",
    display: "inline-block",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    backgroundColor: $theme.borders.borderE6,
    marginRight: "10px",
  },
}));

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
  { value: "COMPLETED", label: "Completed", id: "3" },
  { value: "CANCELLED", label: "Cancelled", id: "4" },
  { value: "REFUNDED", label: "Refunded", id: "5" },
  { value: "RETURNED", label: "Returned", id: "6" },
];
const limitSelectOptions = [
  { value: 7, label: "Last 7 orders" },
  { value: 15, label: "Last 15 orders" },
  { value: 30, label: "Last 30 orders" },
];

function TableRow(data: any) {
  const [css] = useStyletron();
  const [useCss, theme] = themedUseStyletron();
  const [expanded, setExpanded] = React.useState(false);
  const drawerDispatch = useDrawerDispatch();
  const openDrawer = React.useCallback(() => {
    return;
    drawerDispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "ORDER_UPDATE_FORM",
      data: data.data,
    });
  }, [drawerDispatch, data]);
  const agreed = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const defaulted = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const pending = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const from_agrees = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });
  const requested = useCss({
    ":before": {
      content: '""',
      backgroundColor: "rgb(100,0,0,)",
    },
  });
  const to_agrees = useCss({
    ":before": {
      content: '""',
      backgroundColor: "rgb(100,100,0,)",
    },
  });
  console.log(data);
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
        <StyledCell onClick={openDrawer}>{data.data._id}</StyledCell>
        <StyledCell onClick={openDrawer}>{data.data.type}</StyledCell>
        <StyledCell onClick={openDrawer}>
          {dayjs(data.data.created).format("DD MMM YYYY")}
        </StyledCell>
        <StyledCell onClick={openDrawer}>
          {dayjs(data.data.agreedDate).format("DD MMM YYYY")}
        </StyledCell>
        <StyledCell onClick={openDrawer}>${data.data.deposit}</StyledCell>
        <StyledCell onClick={openDrawer}>${data.data.total_amount}</StyledCell>
        <StyledCell style={{ justifyContent: "center" }} onClick={openDrawer}>
          {
            <Status
              className={
                data.data.status.toLowerCase() === "agreed"
                  ? agreed
                  : data.data.status.toLowerCase() === "defaulted"
                  ? defaulted
                  : data.data.status.toLowerCase() === "from_agree"
                  ? from_agrees
                  : data.data.status.toLowerCase() === "pending"
                  ? pending
                  : data.data.status.toLowerCase() === "requested"
                  ? requested
                  : data.data.status.toLowerCase() === "to_agrees"
                  ? to_agrees
                  : ""
              }
            >
              {data.data.status}
            </Status>
          }
        </StyledCell>
        {expanded && (
          <div
            className={css({
              gridColumn: "span 8",
              padding: "32px 24px",
            })}
          >
            <StyledTable $gridTemplateColumns="max-content auto auto auto">
              <div role="row" className={css({ display: "contents" })}>
                <StyledCell>
                  <ReactJson
                    src={data.installments}
                    iconStyle="triangle"
                    collapsed={true}
                    name="Installments"
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

export default function Credit() {
  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const currentWallet = useWalletState("currentWallet");
  //   const orderUpdated = useWalletState("orderUpdated");
  //   const wallet_dispatch = useWalletDispatch();
  //   const setOrderUpdated = useCallback(
  //     (flag) => {
  //       wallet_dispatch({
  //         type: "ORDER_UPDATED",
  //         data: flag,
  //       });
  //     },
  //     [wallet_dispatch]
  //   );

  const { data, error, refetch } = useQuery(GET_CREDITS, {
    variables: { account: currentWallet },
  });
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  console.log(data);
  function handleStatus({ value }) {
    setStatus(value);
  }

  function handleLimit({ value }) {
    setLimit(value);
  }
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
              <Heading>Credit</Heading>
            </Col>

            {/* <Col md={9} xs={12}>
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
              </Row>
            </Col> */}
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, auto) minmax(150px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
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
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Type</StyledHeadCell>
                <StyledHeadCell>Created Date</StyledHeadCell>
                <StyledHeadCell>Agreed Date</StyledHeadCell>
                <StyledHeadCell>Deposit</StyledHeadCell>
                <StyledHeadCell>Total Amount</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>

                {dummy_data ? (
                  dummy_data.length ? (
                    dummy_data.map((item, index) => (
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
