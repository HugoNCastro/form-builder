import React, { ReactNode, SetStateAction } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  icon: ReactNode
  openColorPicker: boolean
  setOpenColorPicker: React.Dispatch<SetStateAction<boolean>>
}

export function Button(props: ButtonProps) {
  const { icon, openColorPicker, setOpenColorPicker } = props

  return (
    <motion.button
      onClick={() => setOpenColorPicker(!openColorPicker)}
      whileTap={{ scale: 0.97 }}
      className="text-sm h-10 font-medium rounded-full border border-indigo-600 dark:border-sky-600 p-2 relative transition-colors duration-75"
      type="button"
    >
      {icon}
    </motion.button>
  )
}
