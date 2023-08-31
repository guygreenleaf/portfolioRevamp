import "@/styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box bg="#e0e0e0" minH="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
