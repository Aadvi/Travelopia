import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Link as ChakraLink,
  Button,
  Stack,
  Input,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { Link } from "react-router-dom";

const Links = [
  { name: "Home", path: "/" },
  { name: "Flights", path: "/flights" },
];

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="#071d35" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open-Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems="center">
            <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
              <Box fontSize="xl" fontWeight="bold" color="white">
                Travelopia
              </Box>
            </ChakraLink>

            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <ChakraLink
                  key={link.name}
                  as={Link}
                  to={link.path}
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ textDecoration: "none", bg: "#5b82a3" }}
                  color="white"
                >
                  {link.name}
                </ChakraLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center">
            <Button bg="#5b82a3" variant="solid" size="sm" mr={4}>
              Sign In
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <ChakraLink
                  key={link.name}
                  as={Link}
                  to={link.path}
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ textDecoration: "none", bg: "#5b82a3" }}
                  color="white"
                  onClick={onClose}
                >
                  {link.name}
                </ChakraLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
