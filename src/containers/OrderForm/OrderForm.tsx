import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import Uploader from "components/Uploader/Uploader";
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Row, Col } from "components/FlexBox/FlexBox";
import Input from "components/Input/Input";
import { Textarea } from "components/Textarea/Textarea";
import { useWalletState, useWalletDispatch } from "context/WalletContext";
import Checkbox from "components/CheckBox/CheckBox";
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
];

const UPDATE_ORDER = gql`
  mutation($id: ID!, $status: OrderStatusEnum!) {
    updateOrder(input: { id: $id, status: $status }) {
      _id
      status
      phonenumber
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
  console.log(data.status.toUpperCase());
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      description: data.description,
      status: data.status ? data.status.toUpperCase() : "PENDING",
    },
  });

  const [status, setStatus] = useState([
    { value: data.status ? data.status.toUpperCase() : "PENDING" },
  ]);
  const [description, setDescription] = useState(data.description);

  React.useEffect(() => {
    register({ name: "status", required: true });
    register({ name: "description", required: true });
  }, [register]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue("description", value);
    setDescription(value);
  };

  const handleStatusChange = ({ value }) => {
    setValue("type", value.length > 0 ? value[0].value : "");
    setStatus(value);
  };
  console.log(data);
  const [updateOrderHandler] = useMutation(UPDATE_ORDER);
  const onSubmit = async (updated_data) => {
    const new_data = { ...data, ...updated_data };
    setLoading(true);
    const result = await updateOrderHandler({
      variables: {
        id: new_data._id,
        description: new_data.description,
        status: new_data.status,
      },
    });
    setLoading(false);
    // setOrderUpdated(true);
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
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={description}
                      name="description"
                      onChange={handleDescriptionChange}
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
