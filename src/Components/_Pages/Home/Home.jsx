import { useEffect, useState } from 'react'
import useGetData from '../../_Utils/useGetData'
import { useAtom } from 'jotai'

import Dogs from '../../../../__Data__/Dogs.json'
import { AppointmentAtom } from '../../../atoms/AppointmentAtom'

import { Grid} from '@radix-ui/themes'
import UserCard from '../../_Molecules/UserCard/UserCard'
import SimpleTable from '../../_Molecules/SimpleTable/SimpleTable'

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
      <Grid columns='2' gap='6' rows='repeat(1,64)' display='flex' align='start' justify='center' width='auto' style={{ margin: '1em' }}>
        <SimpleTable
          tableTitle='Upcoming Appointments'
          appointmentData={appointments}
        />
        <div>
          <h3>Clients to call</h3>
          {userData && userData.results ?
            (userData.results.map((element, index) => (
                <UserCard 
                  key={`${element.name}_${element.value}_${index}`}
                  thumbnail={element.picture.thumbnail}
                  firstName={element.name.first}
                  LastName={element.name.last}
                  cellPhone={element.cell}
                  country={element.location.country}
                  dogName={element.dogName}
                  dogBreed={element.dogBreed}
                  dogSize={element.dogSize}
                  onButtonClickCallback={() => handleAddNewAppointment(element)}
                  />
              ))
            ) : (
              <p>No data available</p>
            )
          }          
        </div>  
      </Grid>
    </>
  )

}

export default Home