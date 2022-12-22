import { Box, Button, Card, CardBody, CardFooter, Grid, Heading, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const UserList = () => {
  const [users, setUsers] = useState([]);
  console.log("users:", users);

  const fetchUser = async () => {
    let { data } = await axios.get("http://localhost:3000/api/userRegister/getUser");
    setUsers(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Grid m="auto" p="6" bg="gray" templateColumns="repeat(2, 1fr)" gap={4} justifyContent="center" alignItems={"center"}>
      {users.map((user, i) => {
        return (
          <Card  bg="tomato" w="100%" m="auto" direction={{ base: "column", sm: "row" }} overflow="hidden">
            <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={user.pic} alt="Caffe Latte" />

            <Stack>
              <CardBody>
                <Heading size="md">Name: {user.firstName}</Heading>

                <Heading size="md">Phone : {user.phone}</Heading>
                <Heading size="md">Emial : {user.email}</Heading>
              <CardFooter display={'flex'} justifyContent='space-between'>
                <FaUserEdit size={'30px'}></FaUserEdit>
                <AiFillDelete size={'30px'}></AiFillDelete>
              </CardFooter>
              </CardBody>
            </Stack>
          </Card>
        );
      })}
    </Grid>
  );
};

export default UserList;
