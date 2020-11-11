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
import { useWalletState } from "context/WalletContext";
import Select from "components/Select/Select";
import { FormFields, FormLabel } from "components/FormFields/FormFields";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";

const options = [
  { value: "Fruits & Vegetables", name: "Fruits & Vegetables", id: "1" },
  { value: "Meat & Fish", name: "Meat & Fish", id: "2" },
  { value: "Purse", name: "Purse", id: "3" },
  { value: "Hand bags", name: "Hand bags", id: "4" },
  { value: "Shoulder bags", name: "Shoulder bags", id: "5" },
  { value: "Wallet", name: "Wallet", id: "6" },
  { value: "Laptop bags", name: "Laptop bags", id: "7" },
  { value: "Women Dress", name: "Women Dress", id: "8" },
  { value: "Outer Wear", name: "Outer Wear", id: "9" },
  { value: "Pants", name: "Pants", id: "10" },
];

const typeOptions = [
  { value: "grocery", name: "Grocery", id: "1" },
  { value: "women-cloths", name: "Women Cloths", id: "2" },
  { value: "bags", name: "Bags", id: "3" },
  { value: "makeup", name: "Makeup", id: "4" },
];

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $account: String!
    $id: String!
    $picture: String!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      account: $account
      id: $id
      input: {
        picture: $picture
        name: $name
        description: $description
        price: $price
      }
    ) {
      _id
      picture
      name
      description
      price
    }
  }
`;
type Props = any;

const AddProduct: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState("data");
  const currentWallet = useWalletState("currentWallet");
  //===================================================
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });
  const [type, setType] = useState([{ value: data.type }]);
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState(data.description);
  React.useEffect(() => {
    // register({ name: "type" });
    // register({ name: "categories" });
    register({ name: "picture" });
    register({ name: "description" });
    // register({ name: "_id" });
    // register({ name: "__typename" });
  }, [register]);

  const handleMultiChange = ({ value }) => {
    setValue("categories", value);
    setTag(value);
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue("description", value);
    setDescription(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue("type", value);
    setType(value);
  };
  const handleUploader = (files) => {
    setValue("picture", files[0].path);
  };
  const [updateProductHandler] = useMutation(UPDATE_PRODUCT);
  const onSubmit = (updated_data) => {
    const new_data = { ...data, ...updated_data };
    updateProductHandler({
      variables: {
        account: currentWallet,
        id: new_data._id,
        picture: new_data.picture,
        name: new_data.name,
        description: new_data.description,
        price: Number(new_data.price),
      },
    });
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Product</DrawerTitle>
      </DrawerTitleWrapper>

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
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <Uploader onChange={handleUploader} imageURL={data.picture} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>

                {/* <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields> */}

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="price"
                  />
                </FormFields>

                {/* <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" inputRef={register} name="salePrice" />
                </FormFields> */}

                {/* <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="discountInPercent"
                  />
                </FormFields> */}

                {/* <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input type="number" inputRef={register} name="quantity" />
                </FormFields> */}

                {/* <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
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
                </FormFields> */}

                {/* <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
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
                    multi
                  />
                </FormFields> */}
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
            Update Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
