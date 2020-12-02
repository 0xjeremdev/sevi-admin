import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Row, Col } from "components/FlexBox/FlexBox";
import { Textarea } from "components/Textarea/Textarea";
import { useWalletDispatch } from "context/WalletContext";
import Select from "components/Select/Select";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import { InLineLoader } from "components/InlineLoader/InlineLoader";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";

const statusOptions = [
  { value: "DELIVERED", label: "Delivered", id: "1" },
  { value: "PENDING", label: "Pending", id: "2" },
  { value: "COMPLETED", label: "Completed", id: "3" },
  { value: "CANCELLED", label: "Cancelled", id: "4" },
  { value: "REFUNDED", label: "Refunded", id: "5" },
  { value: "RETURNED", label: "Returned", id: "6" },
  { value: "ARCHIVED", label: "Archived", id: "7" },
];

const UPDATE_ORDER = gql`
  mutation(
    $status: OrderStatusEnum!
    $orderID: ID!
    $phonenumber: String!
    $affiliate: String
    $address: String
    $deliveryType: DeliveryTypeEnum!
    $what3words: String
    $lat: Float
    $lon: Float
    $notes: String
  ) {
    updateOrder(
      input: {
        status: $status
        orderID: $orderID
        name: "harry me"
        notes: $notes
        phonenumber: $phonenumber
        affiliate: $affiliate
        paymentType: SEVI
        delivery: {
          address: $address
          deliveryType: $deliveryType
          what3words: $what3words
          location: { lat: $lat, lon: $lon }
        }
        products: [{ id: "5fbb9de3aa89fcf4be5234bd", quantity: 5 }]
      }
    ) {
      status
    }
  }
`;

type Props = any;

const UpdateOrder: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState("data");
  const wallet_dispatch = useWalletDispatch();
  const [loading, setLoading] = useState(false);
  const setOrderUpdated = useCallback(
    (flag) => {
      wallet_dispatch({
        type: "ORDER_UPDATED",
        data: flag,
      });
    },
    [wallet_dispatch]
  );
  //===================================================
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      notes: data.notes ? data.notes : "",
      status: data.status ? data.status.toUpperCase() : "PENDING",
    },
  });

  const [status, setStatus] = useState([
    { value: data.status ? data.status.toUpperCase() : "PENDING" },
  ]);
  const [notes, setNotes] = useState(data.notes ? data.notes : "");

  React.useEffect(() => {
    register({ name: "status", required: true });
    register({ name: "notes", required: true });
  }, [register]);

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setValue("notes", value);
    setNotes(value);
  };

  const handleStatusChange = ({ value }) => {
    setValue("status", value.length > 0 ? value[0].value : "");
    setStatus(value);
  };
  const [updateOrderHandler] = useMutation(UPDATE_ORDER);
  const onSubmit = async (updated_data) => {
    const new_data = { ...data, ...updated_data };
    setLoading(true);
    await updateOrderHandler({
      variables: {
        orderID: new_data._id,
        notes: new_data.notes,
        status: new_data.status,
        phonenumber: new_data.phonenumber,
        address: new_data.delivery.address,
        deliveryType: new_data.delivery.deliveryType,
        affiliate: new_data.affiliate._id,
      },
    });
    setLoading(false);
    setOrderUpdated(true);
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Order</DrawerTitle>
      </DrawerTitleWrapper>
      {loading ? (
        <InLineLoader />
      ) : (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: "100%" }}
          noValidate
        >
          <Scrollbars
            autoHide
            renderView={(props) => (
              <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
            )}
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                style={{ display: "none" }}
                className="track-horizontal"
              />
            )}
          >
            <Row>
              <Col lg={4}>
                <FieldDetails>
                  Modify your Order description and necessary information from
                  here
                </FieldDetails>
              </Col>

              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Status</FormLabel>
                    <Select
                      options={statusOptions}
                      labelKey="label"
                      valueKey="value"
                      placeholder="Order Status"
                      value={status}
                      onChange={handleStatusChange}
                      searchable={false}
                      clearable={false}
                      overrides={{
                        Placeholder: {
                          style: ({ $theme }) => {
                            return {
                              ...$theme.typography.fontBold14,
                              color: $theme.colors.textNormal,
                            };
                          },
                        },
                        DropdownListItem: {
                          style: ({ $theme }) => {
                            return {
                              ...$theme.typography.fontBold14,
                              color: $theme.colors.textNormal,
                            };
                          },
                        },
                        OptionContent: {
                          style: ({ $theme, $selected }) => {
                            return {
                              ...$theme.typography.fontBold14,
                              color: $selected
                                ? $theme.colors.textDark
                                : $theme.colors.textNormal,
                            };
                          },
                        },
                        SingleValue: {
                          style: ({ $theme }) => {
                            return {
                              ...$theme.typography.fontBold14,
                              color: $theme.colors.textNormal,
                            };
                          },
                        },
                        Popover: {
                          props: {
                            overrides: {
                              Body: {
                                style: { zIndex: 5 },
                              },
                            },
                          },
                        },
                      }}
                    />
                  </FormFields>
                  <FormFields>
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                      value={notes}
                      name="notes"
                      onChange={handleNotesChange}
                    />
                  </FormFields>
                </DrawerBox>
              </Col>
            </Row>
          </Scrollbars>

          <ButtonGroup>
            <Button
              kind={KIND.minimal}
              onClick={closeDrawer}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    width: "50%",
                    borderTopLeftRadius: "3px",
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius: "3px",
                    borderBottomLeftRadius: "3px",
                    marginRight: "15px",
                    color: $theme.colors.red400,
                  }),
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    width: "50%",
                    borderTopLeftRadius: "3px",
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius: "3px",
                    borderBottomLeftRadius: "3px",
                  }),
                },
              }}
            >
              Update Order
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </>
  );
};

export default UpdateOrder;
