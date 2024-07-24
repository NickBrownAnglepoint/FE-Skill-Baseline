import { useEffect, useState } from 'react'
import useGetData from '../../_Utils/useGetData'
import { useAtom } from 'jotai'

import Dogs from '../../../../__Data__/Dogs.json'
import { AppointmentAtom } from '../../../atoms/AppointmentAtom'

import { Table, Box, Card, Flex, Avatar, Text, Grid, IconButton } from '@radix-ui/themes'
import {CircleIcon} from '@radix-ui/react-icons'

function Home() {
  const [userData, setUserData] = useState();
  const { data, loading, error } = useGetData('https://randomuser.me/api/?results=12');

  const [appointments, setAppointments] = useAtom(AppointmentAtom)

  const handleAddNewAppointment = (newApptUser) => {
    setAppointments([...appointments, newApptUser]);
    let mutatedUserData = userData.results.filter((user) => {
      let notNewApptUser = JSON.stringify(user) != JSON.stringify(newApptUser);
      if (notNewApptUser) return user;
    })
    setUserData({ ...userData, results: mutatedUserData });
    console.log(userData);
    
  }

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
                  <Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Dog</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              {appointments.length > 0 ?
            (
              appointments.map((element, index) =>
              (
                <Table.Body key={index}>
                  <Table.Row>
                      <Table.RowHeaderCell>{`${element.name.first} ${element.name.last}`}</Table.RowHeaderCell>
                    <Table.Cell>{`${element.dogName} (${element.dogBreed})`}</Table.Cell>
                    <Table.Cell>{element.phone}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
            ) : (
              <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={3}>No New Appointments</Table.Cell>
              </Table.Row>
            </Table.Body>
            )}


              </Table.Root>
            </Card>
        </Flex>
        <div>
          <h3>Clients to call</h3>
          {userData && userData.results ?
            (userData.results.map((element, index) =>
            (
              <Box key={`${element.id.name}_${element.id.value}_${index}`} maxWidth='1240px'>
                <Card style={{margin: '0.5em', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
                  <Flex>
                    <CircleIcon width="18" height="18" cursor='pointer' onClick={() => { handleAddNewAppointment(element) }} />
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