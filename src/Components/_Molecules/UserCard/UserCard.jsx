import { Box, Card, Flex, Avatar, Text} from '@radix-ui/themes'
import { CircleIcon } from '@radix-ui/react-icons'
import classes from './UserCard.module.css'

const UserCard = ({thumbnail, firstName, LastName, cellPhone, country, dogName, dogBreed, dogSize, onButtonClickCallback}) => {
  return (
    <Box maxWidth='1240px'>
                <Card id={classes.cardParent}>
                  <Flex gap='3' align='center'>
                    <Avatar
                      size='3'
                      src={thumbnail}
                      radius='full'
                      fallback='T'
                    />
                    <Box>
                      <Text as='div' size='2' weight='bold'>
                        {`${firstName} ${LastName}`}
                      </Text>
                      <Text as='div' size='2' color='gray'>
                        Phone: {cellPhone} ({country})
                      </Text>
                      <Text as='div' size='2' color='gray'>
                        Dog: {dogName} ({dogBreed}, {dogSize})
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <CircleIcon width="18" height="18" cursor='pointer' onClick={onButtonClickCallback} />
                  </Flex>
                </Card>
              </Box>
  )
}

export default UserCard