import React, { useState } from "react";
import { styled, withStyle, createThemedUseStyletron } from "baseui";
import dayjs from "dayjs";
import { Grid, Row as Rows, Col as Column } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import Input from "components/Input/Input";

import { useQuery, gql } from "@apollo/client";
import { Wrapper, Header, Heading } from "components/Wrapper.style";
import Checkbox from "components/CheckBox/CheckBox";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from "./Orders.style";
import NoResult from "components/NoResult/NoResult";

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
  { value: "delivered", label: "Delivered" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
];
const limitSelectOptions = [
  { value: 7, label: "Last 7 orders" },
  { value: 15, label: "Last 15 orders" },
  { value: 30, label: "Last 30 orders" },
];

export default function Orders() {
  const sessionUserId: number = parseInt(
    localStorage.getItem("pickbazar_token")
  );
  const GET_ORDERS = gql`
     query getOrders($limit: Int, $searchText: String) {
      orders(userId: ${sessionUserId}, limit: $limit, text: $searchText) {
        id
        amount
        deliveryTime
        subtotal
        discount
        deliveryAddress
        deliveryFee
        status
        userId
      }
    }
  `;
  console.log(GET_ORDERS);
  // id
  // customer_id
  // creation_date
  // delivery_address
  // amount
  // payment_method
  // contact_number
  // status
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const [useCss, theme] = themedUseStyletron();
  const sent = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const processing = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const paid = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });

  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);

  const { data, error, refetch } = useQuery(GET_ORDERS);

  console.log("testOrderArray", data);
  if (error) {
    return <div>Error! {error.message}</div>;
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
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    refetch({ searchText: value });
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map((order) => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
    }
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

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Address"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>
                  <Checkbox
                    type="checkbox"
                    value="checkAll"
                    checked={checked}
                    onChange={onAllCheck}
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
                <StyledHeadCell>Customer ID</StyledHeadCell>
                <StyledHeadCell>Delivery Time</StyledHeadCell>
                <StyledHeadCell>Delivery Address</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Sub Total</StyledHeadCell>
                <StyledHeadCell>Delivery Fee</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>

                {data ? (
                  data.orders.length ? (
                    data.orders
                      .map((item) => item)
                      .map((row, index) => (
                        <React.Fragment key={index}>
                          <StyledCell>
                            <Checkbox
                              name={row.id}
                              checked={checkedId.includes(row.id)}
                              onChange={handleCheckbox}
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
                          </StyledCell>
                          <StyledCell>{index + 1}</StyledCell>
                          <StyledCell>{row.userId}</StyledCell>
                          <StyledCell>
                            {dayjs(row.deliveryTime).format("DD MMM YYYY")}
                          </StyledCell>
                          <StyledCell>{row.deliveryAddress}</StyledCell>
                          <StyledCell>${row.amount}</StyledCell>
                          <StyledCell>{row.subtotal}</StyledCell>
                          <StyledCell>{row.deliveryFee}</StyledCell>

                          <StyledCell style={{ justifyContent: "center" }}>
                            <Status
                              className={
                                row.status === 1
                                  ? sent
                                  : row.status === 2
                                  ? paid
                                  : row.status === 3
                                  ? processing
                                  : row.status === 4
                                  ? failed
                                  : ""
                              }
                            >
                              {row.status === 1
                                ? "delivered"
                                : row.status === 2
                                ? "pending"
                                : row.status === 3
                                ? "processing"
                                : row.status === 4
                                ? "failed"
                                : ""}
                            </Status>
                          </StyledCell>
                        </React.Fragment>
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
