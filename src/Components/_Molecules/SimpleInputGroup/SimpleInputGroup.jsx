import React from 'react'

import './SimpleInputGroup.style.css'

import { TextField, Button } from '@radix-ui/themes'
import { MagnifyingGlassIcon, BookmarkIcon} from '@radix-ui/react-icons'

const SimpleInputGroup = ({placeholderText, }) => {
  return (
      <div className='simple-input-group__wrapper'>
          <div className='simple-input-group__input'>
            <TextField.Root placeholder="Search the docs…">
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
              </TextField.Root>
          </div>
          <div className='simple-input-group__button'>
            <Button>
                <BookmarkIcon /> Bookmark
            </Button>
          </div>

      </div>
  )
}

export default SimpleInputGroup