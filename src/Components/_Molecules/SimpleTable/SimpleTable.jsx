import { Table, Card, Flex } from '@radix-ui/themes'

const SimpleTable = ({ tableTitle, appointmentData  }) => {
  return (
    <Flex direction={'column'} justify='center' align='start' gap='1'>
          <h3>{tableTitle}</h3>
    <Card style={{width: '100%'}}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Dog</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        {appointmentData.length > 0 ?
      (
        appointmentData.map((element, index) =>
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
  )
}

export default SimpleTable