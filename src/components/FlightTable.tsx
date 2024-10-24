import React, { useEffect, useState } from "react";
import { fetchFlights } from "../services/api";
import { Flight } from "../types/flight";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link as ChakraLink,
  useBreakpointValue,
  Stack,
  Text,
} from "@chakra-ui/react";

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightData = async () => {
    try {
      const data = await fetchFlights();
      setFlights(data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch any flights.");
    } finally {
      setLoading(false);
    }
  };

  //   using useEffect to handle side effects
  //      and updating it in every 60 seconds
  useEffect(() => {
    fetchFlightData();
    const interval = setInterval(() => {
      fetchFlightData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Flight Status</Heading>
      {isMobile ? (
        <Stack spacing={4}>
          {flights.map((flight) => (
            <Box
              key={flight.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              bg="white"
              boxShadow="md"
            >
              <Text fontSize="lg" fontWeight="bold">
                Flight: {flight.flightNumber} ({flight.airline})
              </Text>
              <Text>Origin: {flight.origin}</Text>
              <Text>Destination: {flight.destination}</Text>
              <Text>
                Departure: {new Date(flight.departureTime).toLocaleString()}
              </Text>
              <Text>Status: {flight.status}</Text>
              <ChakraLink
                as={Link}
                to={`/flight/${flight.id}`}
                px={2}
                py={1}
                rounded="md"
                bg="#459db3"
                fontWeight="bold"
              >
                View Details
              </ChakraLink>
            </Box>
          ))}
        </Stack>
      ) : (
        <TableContainer>
          <Table variant="striped" bg="#33899f">
            <Thead>
              <Tr>
                <Th>Flight Number</Th>
                <Th>Airline</Th>
                <Th>Origin</Th>
                <Th>Destination</Th>
                <Th>Departure Time</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {flights.map((flight) => (
                <Tr key={flight.id}>
                  <Td>
                    <ChakraLink as={Link} to={`/flight/${flight.id}`}>
                      {flight.flightNumber}
                    </ChakraLink>
                  </Td>
                  <Td>{flight.airline}</Td>
                  <Td>{flight.origin}</Td>
                  <Td>{flight.destination}</Td>
                  <Td>{flight.departureTime}</Td>
                  <Td>{flight.status}</Td>
                  <Td>
                    <ChakraLink
                      as={Link}
                      to={`/flight/${flight.id}`}
                      px={2}
                      py={1}
                      rounded="md"
                      bg="#459db3"
                      fontWeight="bold"
                    >
                      View Details
                    </ChakraLink>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FlightTable;
