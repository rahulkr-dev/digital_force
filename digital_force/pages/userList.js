import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const UserList = () => {
  const [users, setUsers] = useState([]);
  // console.log('users:', users)
 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  users.forEach(element => {
  // console.log('element:', element)
  console.log('imgCollection:', element.imgCollection)
  
 });

 
  const fetchUser = async () => {
    let { data } = await axios.get("/api/userRegister/getUser");
    setUsers(data);
  };

  useEffect(() => {
    fetchUser();
    let user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log("user:", user.userExists);
  }, []);

  return (
    <Grid m="auto" p="6" bg="gray" templateColumns="repeat(2, 1fr)" gap={4} justifyContent="center" alignItems={"center"}>
      {users.map((user, i) => {
        return (
          <Card bg="tomato" w="100%" m="auto" direction={{ base: "column", sm: "row" }} overflow="hidden">
            <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={user.pic} alt="Caffe Latte" />

            <Stack>
              <CardBody>
                <Heading size="md">Name: {user.firstName}</Heading>

                <Heading size="md">Phone : {user.phone}</Heading>
                <Heading size="md">Emial : {user.email}</Heading>
                <CardFooter display={"flex"} justifyContent="space-between">
                  <FaUserEdit onClick={onOpen} size={"30px"}></FaUserEdit>
                  <AiFillDelete size={"30px"}></AiFillDelete>
                </CardFooter>
              </CardBody>
            </Stack>
          </Card>
        );
      })}
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} bg="tomato">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

const editModel = () => {
  <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Create your account</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input ref={initialRef} placeholder="First name" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Last name</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};
export default UserList;
