import React, { useState, useCallback } from "react";
import { styled, withStyle } from "baseui";
import { Grid, Row as Rows, Col as Column } from "components/FlexBox/FlexBox";
import Input from "components/Input/Input";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Header, Heading } from "components/Wrapper.style";
import Fade from "react-reveal/Fade";
import ProductCard from "components/ProductCard/ProductCard";
import NoResult from "components/NoResult/NoResult";
import { CURRENCY } from "settings/constants";
import Placeholder from "components/Placeholder/Placeholder";
import { useWalletDispatch, useWalletState } from "context/WalletContext";

export const ProductsRow = styled("div", ({ $theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "25px",
  backgroundColor: $theme.colors.backgroundF7,
  position: "relative",
  zIndex: "1",

  "@media only screen and (max-width: 767px)": {
    marginLeft: "-7.5px",
    marginRight: "-7.5px",
    marginTop: "15px",
  },
}));

export const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px) and (max-width: 991px)": {
    alignItems: "center",
  },
}));

export const ProductCardWrapper = styled("div", () => ({
  height: "100%",
}));

export const LoaderWrapper = styled("div", () => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexWrap: "wrap",
}));

export const LoaderItem = styled("div", () => ({
  width: "25%",
  padding: "0 15px",
  marginBottom: "30px",
}));

const SEARCH_PRODUCT = gql`
  query($searchKey: String, $scrollId: String, $vendorID: String) {
    searchProduct(
      input: { searchKey: $searchKey, scrollId: $scrollId, vendorID: $vendorID }
    ) {
      hits {
        _id
        name
        description
        price
        exchange {
          sending
          pickup
          barter
          digital
        }
        gallery {
          url
        }
        categories {
          type
          primary
          subCategory
        }
      }
      total
      scroll
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      _id
    }
  }
`;
export default function Products() {
  // const { data, error, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
  //   variables: { account },
  // });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const productUpdated = useWalletState("productUpdated");
  const currentWallet = useWalletState("currentWallet");
  const wallet_dispatch = useWalletDispatch();
  const setProductUpdated = useCallback(
    (flag) => {
      wallet_dispatch({
        type: "PRODUCT_UPDATED",
        data: flag,
      });
    },
    [wallet_dispatch]
  );

  const { data, error, refetch } = useQuery(SEARCH_PRODUCT, {
    variables: { searchKey: search, vendorID: currentWallet },
  });
  if (productUpdated) {
    refetch({ searchKey: search }).then(() => {
      setProductUpdated(false);
    });
  }
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      refetch({ searchKey: search }).then(() => {
        setLoading(false);
      });
    },
  });
  // const [loadingMore, toggleLoading] = useState(false);
  // const [type, setType] = useState([]);
  // const [priceOrder, setPriceOrder] = useState([]);

  // console.log(error);
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  // function loadMore() {
  //   toggleLoading(true);
  //   fetchMore({
  //     variables: {
  //       offset: data.products.items.length,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       toggleLoading(false);
  //       if (!fetchMoreResult) return prev;
  //       return Object.assign({}, prev, {
  //         products: {
  //           __typename: prev.products.__typename,
  //           items: [...prev.products.items, ...fetchMoreResult.products.items],
  //           hasMore: fetchMoreResult.products.hasMore,
  //         },
  //       });
  //     },
  //   });
  // }
  // function handlePriceSort({ value }) {
  //   setPriceOrder(value);
  //   if (value.length) {
  //     refetch({
  //       sortByPrice: value[0].value,
  //     });
  //   } else {
  //     refetch({
  //       sortByPrice: null,
  //     });
  //   }
  // }
  // function handleCategoryType({ value }) {
  //   setType(value);
  //   if (value.length) {
  //     refetch({
  //       type: value[0].value,
  //     });
  //   } else {
  //     refetch({
  //       type: null,
  //     });
  //   }
  // }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
    // refetch({ searchKey: "" });
  }
  function productDelete(p_id) {
    setLoading(true);
    deleteProduct({ variables: { id: p_id } });
  }
  console.log(data);
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Products</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row>
                {/* <Col md={3} xs={12}>
                  <Select
                    options={typeSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Category Type"
                    value={type}
                    searchable={false}
                    onChange={handleCategoryType}
                  />
                </Col> */}

                {/* <Col md={3} xs={12}>
                  <Select
                    options={priceSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={priceOrder}
                    placeholder="Price"
                    searchable={false}
                    onChange={handlePriceSort}
                  />
                </Col> */}

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Row>
            {data && !productUpdated && !loading ? (
              data.searchProduct && data.searchProduct.hits.length !== 0 ? (
                data.searchProduct.hits.map((item: any, index: number) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: "15px 0" }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        title={item.name}
                        weight={item.unit}
                        image={
                          item.gallery.length > 0 ? item.gallery[0].url : null
                        }
                        currency={CURRENCY}
                        price={item.price}
                        salePrice={item.price}
                        discountInPercent={item.discountInPercent}
                        onDelete={productDelete}
                        data={item}
                      />
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult />
              )
            ) : (
              <LoaderWrapper>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
              </LoaderWrapper>
            )}
          </Row>
          {/* {data && data.products && data.products.hasMore && (
            <Row>
              <Col
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={loadMore} isLoading={loadingMore}>
                  Load More
                </Button>
              </Col>
            </Row>
          )} */}
        </Col>
      </Row>
    </Grid>
  );
  // return (
  //   <Grid fluid={true}>
  //     <Row>
  //       <Col md={12}>
  //         <Header style={{ marginBottom: 15 }}>
  //           <Col md={2} xs={12}>
  //             <Heading>Products</Heading>
  //           </Col>

  //           <Col md={10} xs={12}>
  //             <Row>
  //               <Col md={3} xs={12}>
  //                 <Select
  //                   options={typeSelectOptions}
  //                   labelKey="label"
  //                   valueKey="value"
  //                   placeholder="Category Type"
  //                   value={type}
  //                   searchable={false}
  //                   onChange={handleCategoryType}
  //                 />
  //               </Col>

  //               <Col md={3} xs={12}>
  //                 <Select
  //                   options={priceSelectOptions}
  //                   labelKey="label"
  //                   valueKey="value"
  //                   value={priceOrder}
  //                   placeholder="Price"
  //                   searchable={false}
  //                   onChange={handlePriceSort}
  //                 />
  //               </Col>

  //               <Col md={6} xs={12}>
  //                 <Input
  //                   value={search}
  //                   placeholder="Ex: Search By Name"
  //                   onChange={handleSearch}
  //                   clearable
  //                 />
  //               </Col>
  //             </Row>
  //           </Col>
  //         </Header>

  //         <Row>
  //           {data ? (
  //             data.products && data.products.items.length !== 0 ? (
  //               data.products.items.map((item: any, index: number) => (
  //                 <Col
  //                   md={4}
  //                   lg={3}
  //                   sm={6}
  //                   xs={12}
  //                   key={index}
  //                   style={{ margin: "15px 0" }}
  //                 >
  //                   <Fade bottom duration={800} delay={index * 10}>
  //                     <ProductCard
  //                       title={item.name}
  //                       weight={item.unit}
  //                       image={item.image}
  //                       currency={CURRENCY}
  //                       price={item.price}
  //                       salePrice={item.salePrice}
  //                       discountInPercent={item.discountInPercent}
  //                       data={item}
  //                     />
  //                   </Fade>
  //                 </Col>
  //               ))
  //             ) : (
  //               <NoResult />
  //             )
  //           ) : (
  //             <LoaderWrapper>
  //               <LoaderItem>
  //                 <Placeholder />
  //               </LoaderItem>
  //               <LoaderItem>
  //                 <Placeholder />
  //               </LoaderItem>
  //               <LoaderItem>
  //                 <Placeholder />
  //               </LoaderItem>
  //               <LoaderItem>
  //                 <Placeholder />
  //               </LoaderItem>
  //             </LoaderWrapper>
  //           )}
  //         </Row>
  //         {data && data.products && data.products.hasMore && (
  //           <Row>
  //             <Col
  //               md={12}
  //               style={{ display: "flex", justifyContent: "center" }}
  //             >
  //               <Button onClick={loadMore} isLoading={loadingMore}>
  //                 Load More
  //               </Button>
  //             </Col>
  //           </Row>
  //         )}
  //       </Col>
  //     </Row>
  //   </Grid>
  // );
}
