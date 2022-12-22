import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
      <Box onClick={() => router.push("/signup")} as='button' borderRadius='md' bg='tomato' color='white' px={4} h={8}>
  Button
</Box>
  );
};

export default Home;
