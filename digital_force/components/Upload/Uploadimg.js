import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "../Upload/upload.module.css";
import axios from "axios";

function Uploadimg() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getimages();
  }, []);

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  async function getimages() {
    try {
      const res = await axios.get("http://localhost:3000/api/upload/");
      console.log(res);
      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach((ele) =>
      formData.append("imgCollection", ele)
    );
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //console.log(res.message);
      console.log(res);
    } catch (err) {
      //console.log(err.response.status);
      console.log(err);
    }
    getimages();
  };

  // var selected = [];
  // function handleChange(e) {
  //   let isChecked = e.target.checked;
  //   let value = e.target.value;
  //   //console.log(value)
  //   if (isChecked) {
  //     selected.push(value);
  //   } else {
  //     selected = selected.filter((e) => e !== value);
  //   }
  // }

  async function deleteimg(e) {
    //console.log(selected);
    try {
      let res = axios.delete(`http://localhost:3000/api/upload/`, {
        headers: {
          img: e,
        },
      });
      console.log(res.data);
      getimages();
    } catch (error) {
      console.log(error);
    }
  }
  // async function delselectedimg() {
  //   //console.log(selected);
  //   deleteimg(selected);
  //   getimages();
  // }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload new images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              border={"1px dashed"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {" "}
              <Text mt={1}>Drop Files here</Text>
              <Text>or</Text>
              <div className={styles.uploads}>
                <form onSubmit={onSubmit}>
                  <div>
                    <input
                      type="file"
                      id="file"
                      multiple
                      name="imgCollection"
                      onChange={onChange}
                    />
                  </div>

                  <HStack
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    spacing={4}
                  >
                    <button type="submit" value="Upload" onClick={onClose}>
                      Upload
                    </button>
                    <button onClick={onClose}>Close</button>
                  </HStack>
                </form>
              </div>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={styles.hero}>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"12px"}
          padding={"16px 64px"}
        >
          <Stack gridAutoFlow={"column"}>
            <h2>Media Library</h2>
            <h4>{images.length} images</h4>
          </Stack>
          <Box
            display={"flex"}
            flexDirection={["column-reverse", "column-reverse", "row", "row"]}
            gap={"20px"}
          >
            {/* <button onClick={delselectedimg}>
              <h6>Delete selected images</h6>
            </button> */}
            <button onClick={onOpen}>
              <h6>Upload New Image</h6>
            </button>
          </Box>
        </Box>
        {images.length === 0 ? (
          <div className={styles.image}>
            <img src={`/upalod.png`} alt="" />
            <p>Click on Upload new image to start adding images</p>
          </div>
        ) : (
          <div className={styles.allimg}>
            {images?.map((e) => (
              <div key={e}>
                {/* <input
                  onChange={(e) => handleChange(e)}
                  type="checkbox"
                  value={e}
                /> */}
                <img src={e} alt="" />
                <button onClick={(e) => deleteimg(e)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Uploadimg;
