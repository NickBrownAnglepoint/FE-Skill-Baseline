import React, { useEffect, useState } from 'react'
import useGetData from '../../_Utils/useGetData'

import Dogs from '../../../../__Data__/Dogs.json'

import { Table, Box, Card, Flex, Avatar, Text, Grid } from '@radix-ui/themes'

function Home() {
  const [userData, setUserData] = useState();

  const { data, loading, error } = useGetData('https://randomuser.me/api/?results=12');

  useEffect(() => {
    if (data) {
      const modifiedData = data.results.map((item, index) => ({
        ...item,
        dogName: Dogs[index % Dogs.length].dogName,
        dogBreed: Dogs[index % Dogs.length].dogBreed,
        dogSize: Dogs[index % Dogs.length].dogSize
      }));
  
      setUserData({ ...data, results: modifiedData });
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Grid columns='2' gap='6' rows='repeat(1,64)' display='flex' align='start' justify='center' width='auto' style={{margin: '1em'}}>
        <Flex direction={'column'} justify='center' align='start' gap='1'>
          <h3>Upcoming Appointments</h3>
          <Card style={{width: '100%'}}>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                  <Table.Cell>danilo@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                  <Table.Cell>zahra@example.com</Table.Cell>
                  <Table.Cell>Admin</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                  <Table.Cell>jasper@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>
              </Table.Body>
              </Table.Root>
            </Card>
        </Flex>
        <div>
          <h3>Clients to call</h3>
          {userData && userData.results ?
            (userData.results.map((element, index) =>
            (
              <Box key={`${element.id.name}_${element.id.value}_${index}`} maxWidth='1240px'>
                <Card style={{margin: '0.5em'}}>
                  <Flex gap='3' align='center'>
                    <Avatar
                      size='3'
                      src={element.picture.thumbnail}
                      radius='full'
                      fallback='T'
                    />
                    <Box>
                      <Text as='div' size='2' weight='bold'>
                        {`${element.name.first} ${element.name.last}`}
                      </Text>
                      <Text as='div' size='2' color='gray'>
                        Phone: {element.cell} ({element.location.country})
                      </Text>
                      <Text as='div' size='2' color='gray'>
                        Dog: {element.dogName} ({element.dogBreed}, {element.dogSize})
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            )
            )
            ) : (<p>No data available</p>)
          }          
        </div>  
      </Grid>
    </>
  )

}

export default Home