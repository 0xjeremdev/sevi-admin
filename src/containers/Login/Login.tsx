import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import {
  Formik,
  Form,
  //  Field
} from "formik";
import * as Yup from "yup";
// import { AuthContext } from "context/auth";
import {
  FormFields,
  // FormLabel,
  FormTitle,
  // Error,
} from "components/FormFields/FormFields";
import {
  Wrapper,
  FormWrapper,
  LogoImage,
  LogoWrapper,
  QRWrapper,
} from "./Login.style";
import Logoimage from "assets/image/PickBazar.png";

import QRCode from "qrcode.react";
import { useSubscription, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const initialValues = {
  username: "",
  password: "",
};

const getLoginValidationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().required("Username is Required!"),
    password: Yup.string().required("Password is Required!"),
  });
};

// const MyInput = ({ field, form, ...props }) => {
//   return <Input {...field} {...props} />;
// };

export default () => {
  // let history = useHistory();
  // let location = useLocation();
  // const { authenticate, isAuthenticated } = useContext(AuthContext);
  // if (isAuthenticated) return <Redirect to={{ pathname: "/" }} />;

  // let { from } = (location.state as any) || { from: { pathname: "/" } };
  // let sessionToken = localStorage.getItem("myAuthToken");

  const [difficultKey] = useState(uuidv4());
  // // const [isToken, setIsToken] = useState(sessionToken);

  console.log("difficultKey:", difficultKey);

  const QRcontent = {
    key: difficultKey,
    type: "weblogin",
  };

  const GET_JWT = gql`
    subscription($qrkey: String!) {
      getMyToken(input: { qrKey: $qrkey }) {
        jwt
      }
    }
  `;

  const { data, error } = useSubscription(GET_JWT, {
    variables: {
      qrkey: difficultKey,
    },
  });

  if (error) {
    console.log("error:", error);
  }

  useEffect(() => {
    if (data) {
      console.log("data:", data);

      // authenticate(
      //   { username: "", password: "", authToken: data.getMyToken.jwt },
      //   () => {
      //     history.replace(from);
      //   }
      // );
    }
  }, [data]);

  let login = ({ username, password }) => {
    // authenticate({ username, password, authToken: "" }, () => {
    //   history.replace(from);
    // });
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={login}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="pickbazar-admin" />
                </LogoWrapper>
                <FormTitle>Scan with Sevi to Login to your admin account</FormTitle>
              </FormFields>
              {/* <FormFields>
                <FormLabel>Username</FormLabel>
                <Field
                  type="email"
                  name="username"
                  component={MyInput}
                  placeholder="Ex: demo@demo.com"
                />
                {errors.username && touched.username && (
                  <Error>{errors.username}</Error>
                )}
              </FormFields>
              <FormFields>
                <FormLabel>Password</FormLabel>
                <Field
                  type="password"
                  name="password"
                  component={MyInput}
                  placeholder="Ex: demo"
                />
                {errors.password && touched.password && (
                  <Error>{errors.password}</Error>
                )}
              </FormFields>
              <Button
                type="submit"
                disabled={isSubmitting}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "100%",
                      marginLeft: "auto",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      borderBottomRightRadius: "3px",
                    }),
                  },
                }}
              >
                Submit
              </Button> */}

              <QRWrapper>
                <QRCode
                  value={JSON.stringify(QRcontent)}
                  level="M"
                  size={256}
                />
              </QRWrapper>
            </Form>
          )}
          validationSchema={getLoginValidationSchema}
        />
      </FormWrapper>
    </Wrapper>
  );
};
