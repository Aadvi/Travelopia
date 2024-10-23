import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFlightsById } from "../services/api";
import { Flight } from "../types/flight";
import { Alert, AlertIcon, Box, Container, Heading, Spinner, Text } from "@chakra-ui/react";

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await fetchFlightsById(id!);
        setFlight(data);
        setError(null);
      } catch (error) {
        setError("Failed to Fetch Flight details");
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

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

  if (!flight) {
    return <Text>No Flight data available.</Text>;
  }

  return(
    <Container p={4}>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Heading>Flight {flight.flightNumber} Details</Heading>
            <Text><strong>Airline:</strong> {flight.airline}</Text>
            <Text><strong>Origin:</strong> {flight.origin}</Text>
            <Text><strong>Destination:</strong> {flight.destination}</Text>
            <Text><strong>Depature Time:</strong> {flight.departureTime}</Text>
            <Text><strong>Status:</strong> {flight.status}</Text>
        </Box>
    </Container>
  )
};


export default FlightDetail;