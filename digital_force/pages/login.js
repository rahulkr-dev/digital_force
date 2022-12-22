import { Box, Flex, Text, FormControl, FormLabel, Input, Button, Image, GridItem, Grid, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const VARIANT_COLOR = "teal";

const Signin = () => {
  const initState = {
    email: "",

    password: "",
  };
  const toast = useToast();
  const router = useRouter();
  const [formData, setFromData] = useState(initState);
  const [resStatus, setResStatus] = useState(false);
  const [error, setError] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFromData({ ...formData, [name]: value });
  };

  const loginUser = async () => {
    setResStatus(false);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/userRegister/loginUser", formData, config);
    console.log("data:", data);
    localStorage.setItem('userId',data.id)    //changed
    setError(data.error);
    setResStatus(!data.error);
  };

  const hanldeClick = async() => {

    await loginUser();

    if (error) {
      toast({
        title: "User Not Found",
        position: "top",
        description: "Plase Check Your Email/Password",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setFromData(initState);
      setError(false);

      return;
    }

    if (resStatus) {
      toast({
        title: "Account created.",
        position: "top",
        description: "LogIn Success.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push("/");
      // setTimeout(() => {
      // }, 2000);

      return;
    }
  };
  return (
    <Box height={"600px"}>
      <Flex bg={"#65647C"} width="full" m="auto" alignItems="center" justifyContent="center">
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
          <Box p={0} mt={6} pB={6} display={"grid"} align="center" justifyContent="center">
            {/* <SignUpHeader /> */}
            <Box textAlign={"center"} height={"100px"}>
              {/* <Image
                w={"30%"}
                m={"auto"}
                src=""
              ></Image> */}
              <Text fontWeight={700} fontSize={{ base: "1.2rem", md: "2rem" }} mt={2}>
                Login to Digital Force Account
              </Text>
            </Box>
            {/* <SignUpForm /> */}
            <Grid mt={4} w="full" templateColumns="repeat(2, 1fr)" gap={4}>
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

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <Button colorScheme="teal" onClick={hanldeClick} w={"64%"} m="auto">
                    Sign In
                  </Button>
                </FormControl>
              </GridItem>
            </Grid>
            <Image
              align={"center"}
              w={400}
              m="auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEqHXwSz1u8Netep301Mkuu9thY6WisMW8SQ&usqp=CAU"
            ></Image>
            <Text> Dont Have Account..?</Text>
            <Button colorScheme="teal" onClick={() => router.push("/signup")} w={"50%"} m="auto" mt="2">
              Create New Account
            </Button>
            {/* <signUp /> */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Signin;
