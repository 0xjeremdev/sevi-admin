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
import axios from "axios";
import Url from "url-parse";
import { InLineLoader } from "components/InlineLoader/InlineLoader";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";

// const options = [
//   { value: "Fruits & Vegetables", name: "Fruits & Vegetables", id: "1" },
//   { value: "Meat & Fish", name: "Meat & Fish", id: "2" },
//   { value: "Purse", name: "Purse", id: "3" },
//   { value: "Hand bags", name: "Hand bags", id: "4" },
//   { value: "Shoulder bags", name: "Shoulder bags", id: "5" },
//   { value: "Wallet", name: "Wallet", id: "6" },
//   { value: "Laptop bags", name: "Laptop bags", id: "7" },
//   { value: "Women Dress", name: "Women Dress", id: "8" },
//   { value: "Outer Wear", name: "Outer Wear", id: "9" },
//   { value: "Pants", name: "Pants", id: "10" },
// ];

const typeOptions = [
  { value: "NEW_PRODUCT", name: "NEW_PRODUCT", id: "1" },
  { value: "SERVICE", name: "SERVICE", id: "2" },
  { value: "USED_PRODUCT", name: "USED_PRODUCT", id: "3" },
];

// const UPDATE_PRODUCT = gql`
//   mutation updateProduct(
//     $account: String!
//     $id: String!
//     $name: String!
//     $sending: Boolean!
//     $pickup: Boolean!
//     $barter: Boolean!
//     $digital: Boolean!
//     $renting: Boolean!
//     $credit: Boolean!
//     $gallery: [ProductGalleryInput!]!
//     $description: String!
//     $price: Int!
//     $primaryCatagory: String!
//     $subCategory: String!
//     $type: ListingTypeEnum!
//   ) {
//     updateProduct(
//       account: $account
//       id: $id
//       input: {
//         name: $name
//         description: $description
//         exchange: {
//           sending: $sending
//           renting: $renting
//           pickup: $pickup
//           barter: $barter
//           digital: $digital
//           credit: $credit
//         }
//         gallery: $gallery
//         price: $price
//         categories: {
//           type: $type
//           primary: $primaryCatagory
//           subCategory: $subCategory
//         }
//       }
//     ) {
//       _id
//       name
//       description
//       price
//     }
//   }
// `;
const CREATE_PRESIGNED_POST = gql`
  mutation($type: UploadTypeEnum!, $account: String) {
    createPreSignedPost(type: $type, account: $account) {
      data
      key
      url
    }
  }
`;
type Props = any;

const AddProduct: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState("data");
  const currentWallet = useWalletState("currentWallet");
  const wallet_dispatch = useWalletDispatch();
  const [loading, setLoading] = useState(false);
  const setProductUpdated = useCallback(
    (flag) => {
      wallet_dispatch({
        type: "PRODUCT_UPDATED",
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
      name: data.name,
      price: data.price,
      description: data.description,
      type: data.category ? data.category.primary : "NEW_PRODUCT",
      primary: data.category ? data.category.primary : "",
      subCategory: data.category ? data.subCategory : "",
    },
  });
  const [checkboxs, setCheckBox] = useState({
    barter: data.exchange.barter,
    sending: data.exchange.sending,
    pickup: data.exchange.pickup,
    digital: data.exchange.digital,
  });
  const [type, setType] = useState([
    { value: data.category ? data.category.type : "NEW_PRODUCT" },
  ]);
  const [description, setDescription] = useState(data.description);
  const [getURL] = useMutation(CREATE_PRESIGNED_POST);
  React.useEffect(() => {
    register({ name: "picture" });
    register({ name: "type", required: true });
    register({ name: "description", required: true });
  }, [register]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue("description", value);
    setDescription(value);
  };
  const handleChecbox = (e) => {
    let nextCheckboxs = { ...checkboxs };
    nextCheckboxs[e.currentTarget.name] = e.currentTarget.checked;
    setCheckBox(nextCheckboxs);
    setValue(e.currentTarget.name, e.currentTarget.checked);
  };
  const handleTypeChange = ({ value }) => {
    setValue("type", value.length > 0 ? value[0].value : "");
    setType(value);
  };
  async function startUpload(file: File, presignedUrl: string, key: string) {
    const send = await axios({
      method: "PUT",
      url: presignedUrl,
      data: file,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (send.status === 200) return "good";
    else return "bad";
  }
  const handleUploader = async (files) => {
    const file = files[0];
    const presignedUrl = await getURL({
      variables: {
        type: "PRODUCT",
        account: currentWallet,
        imageName: file.name,
        imageType: file.type,
      },
    });
    const sendNow = await startUpload(
      file,
      presignedUrl.data.createPreSignedPost.url,
      presignedUrl.data.createPreSignedPost.key
    );
    if (sendNow !== "good") return;
    var url = new Url(presignedUrl.data.createPreSignedPost.url);
    setValue("picture", `${url.origin}${url.pathname}`);
  };
  // const [updateProductHandler] = useMutation(UPDATE_PRODUCT);
  const onSubmit = async (updated_data) => {
    // const new_data = { ...data, ...updated_data };
    setLoading(true);
    // const result = await updateProductHandler({
    //   variables: {
    //     account: currentWallet,
    //     id: new_data._id,
    //     name: new_data.name,
    //     description: new_data.description,
    //     price: Number(new_data.price),
    //     sending: checkboxs.sending,
    //     pickup: checkboxs.pickup,
    //     barter: checkboxs.barter,
    //     digital: checkboxs.digital,
    //     renting: true,
    //     credit: true,
    //     gallery:
    //       new_data.picture == null || new_data.picture == ""
    //         ? []
    //         : [{ url: new_data.picture }],
    //     primaryCatagory: new_data.primary,
    //     type: new_data.type,
    //     subCategory: new_data.subCategory,
    //   },
    // });
    setLoading(false);
    setProductUpdated(true);
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Product</DrawerTitle>
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
                <FieldDetails>Upload your Product image here</FieldDetails>
              </Col>
              <Col lg={8}>
                <DrawerBox>
                  <Uploader
                    onChange={handleUploader}
                    imageURL={
                      data.gallery.length > 0 ? data.gallery[0].url : null
                    }
                  />
                </DrawerBox>
              </Col>
            </Row>

            <Row>
              <Col lg={4}>
                <FieldDetails>
                  Add your Product description and necessary information from
                  here
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
                      name="description"
                      onChange={handleDescriptionChange}
                    />
                  </FormFields>
                  <FormFields>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      inputRef={register({ required: true })}
                      name="price"
                    />
                  </FormFields>
                  <FormFields>
                    <FormLabel>Type</FormLabel>
                    <Select
                      options={typeOptions}
                      labelKey="name"
                      valueKey="value"
                      placeholder="Product Type"
                      value={type}
                      onChange={handleTypeChange}
                      searchable={false}
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
                    <FormLabel>Category Primary</FormLabel>
                    <Input
                      inputRef={register({ required: true, maxLength: 20 })}
                      name="primary"
                    />
                  </FormFields>
                  <FormFields>
                    <FormLabel>Category SubCategory</FormLabel>
                    <Input
                      inputRef={register({ required: true, maxLength: 20 })}
                      name="subCategory"
                    />
                  </FormFields>
                  <FormFields>
                    <FormLabel>Exchange Barter</FormLabel>
                    <Checkbox
                      name="barter"
                      checked={checkboxs.barter}
                      onChange={handleChecbox}
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
                  </FormFields>
                  <FormFields>
                    <FormLabel>Exchange Sending</FormLabel>
                    <Checkbox
                      name="sending"
                      checked={checkboxs.sending}
                      onChange={handleChecbox}
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
                  </FormFields>
                  <FormFields>
                    <FormLabel>Exchange Pickup</FormLabel>
                    <Checkbox
                      name="pickup"
                      checked={checkboxs.pickup}
                      onChange={handleChecbox}
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
                  </FormFields>
                  <FormFields>
                    <FormLabel>Exchange Digital</FormLabel>
                    <Checkbox
                      name="digital"
                      checked={checkboxs.digital}
                      onChange={handleChecbox}
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
              Update Product
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </>
  );
};

export default AddProduct;
