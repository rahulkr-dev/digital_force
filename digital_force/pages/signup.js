import { Box, Flex, Text, FormControl, FormLabel, Input, Button, Image, GridItem, Grid, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const VARIANT_COLOR = "teal";

const SignUp = () => {
  const initState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",

    password: "",
    confirmPassword: "",
  };
  const toast = useToast();
  const router = useRouter();
  const [formData, setFromData] = useState(initState);
  const [resStatus, setResStatus] = useState(false);
  const [data, setData] = useState([]);

  const { firstName, lastName, confirmPassword, email, age, password, phone, country } = formData;
  const [passwordChk, setPasswrdChek] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const val = name === "age" ? Number(value) : value;

    setFromData({ ...formData, [name]: val });
  };

  const createUser = async () => {
    setResStatus(false);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/userRegister/register", formData, config);
    // console.log("data:", data);

    setResStatus(true);
  };

  const hanldeClick = () => {
    let p1 = password;
    let p2 = confirmPassword;

    let em = formData.email;

    if (p1 !== p2) {
      setPasswrdChek(true);
      toast({
        title: "PASSWORD CHECK",
        position: "top",
        description: "PASSWORD IS NOT MATCHING, Please Enter The Correct Password",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setFromData({ ...formData, password: "", confirmPassword: "" });
      setPasswrdChek(false);

      return;
    }
    // Send a POST request axios
    if (!passwordChk) {
      setResStatus(false);
      createUser();

      if (resStatus) {
        toast({
          title: "Account created.",
          position: "top",
          description: "We've created your account for you.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);

        return;
      }
    }
  };
  return (
    <Box height={"600px"}>
      <Flex bg={"#65647C"} width="full" align="center" justifyContent="center">
        <Box
          bg={"white"}
          height={"600px"}
          my={4}
          borderWidth={1}
          px={4}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
        >
          <Box p={4}>
            {/* <SignUpHeader /> */}
            <Box textAlign={"center"}>
              {/* <Image
                w={"30%"}
                m={"auto"}
                src=""
              ></Image> */}
              <Text fontWeight={700} fontSize={{ base: "1.2rem", md: "2rem" }} mt={2}>
                Sign Up to Digital Force Account
              </Text>
            </Box>
            {/* <SignUpForm /> */}
            <Grid mt={2} w="full" templateColumns="repeat(2, 1fr)" gap={2}>
              {/* 1 First Name */}
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input placeholder="Name" type="text" name="firstName" value={firstName} onChange={handleChange} />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="Name" type="text" name="lastName" value={lastName} onChange={handleChange} />
                </FormControl>
              </GridItem>

              {/* 2 Email*/}
              <GridItem colSpan={{ base: 2, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Email" type="email" name="email" value={email} onChange={handleChange} />
                </FormControl>
              </GridItem>
              {/* 3 Password*/}
              <GridItem colSpan={{ base: 2, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input placeholder="Password" type="password" name="password" value={password} onChange={handleChange} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={{ base: 2, md: 2 }}>
                <FormControl isRequired>
                  <FormLabel>Confrim Password</FormLabel>
                  <Input placeholder="Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                </FormControl>
              </GridItem>

              {/* 3 Phone*/}
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input placeholder="Phone" type="text" name="phone" value={phone} onChange={handleChange} />
                </FormControl>
              </GridItem>

              {/* 4 Age*/}
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <FormControl isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input placeholder="Age" type="number" name="age" value={age} onChange={handleChange} />
                </FormControl>
              </GridItem>

              {/* 5 Address*/}

              {/* <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Country</FormLabel>

                  <Select placeholder={value ? value : "Select Country"} name="country" options={options} value={value} onChange={changeHandler} />
                  <Select name="country" value={country} onChange={handleChange} placeholder="Select country">
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="japan">Japan</option>
                </Select>
                </FormControl>
              </GridItem> */}

              {/* 8 Buttom */}
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <Button colorScheme="teal" onClick={hanldeClick} w={"full"}>
                    Sign Up
                  </Button>
                </FormControl>
              </GridItem>
            </Grid>
            {/* <signUp /> */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUp;
