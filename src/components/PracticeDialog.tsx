import React from 'react'
import { Dialog } from '../components/dialog/index'

interface Props {
  isOpen: boolean
}

const PracticeDialog: React.FC<Props> = ({ isOpen }) => {
  return <Dialog isOpen={isOpen}>dialog</Dialog>
}

export default PracticeDialog
