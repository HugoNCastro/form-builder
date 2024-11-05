'use client'

import { ReactNode, useState } from 'react'
import { Button } from './button'
import { ColorBox } from './color-box'
import { motion, AnimatePresence } from 'framer-motion'
import { ColorPanel } from './color-panel'

interface ColorPickerProps {
  icon: ReactNode
}

export function ColorPicker(props: ColorPickerProps) {
  const { icon } = props
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false)

  return (
    <div>
      <Button
        icon={icon}
        openColorPicker={openColorPicker}
        setOpenColorPicker={setOpenColorPicker}
      />
      <AnimatePresence>
        {openColorPicker && (
          <motion.div
            transition={{ type: 'spring', duration: 0.3, bounce: 0.3 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex flex-col w-20 items-center"
          >
            <ColorBox>
              Escolha a cor
              <ColorPanel setOpenColorPicker={setOpenColorPicker} />
            </ColorBox>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
