import { Dispatch, SetStateAction, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Hex } from './hex'
import { SaveButton } from './save-button'

const colors = [
  '#FF6069',
  '#37B7C3',
  '#9B86BD',
  '#F9D689',
  '#FF7F3E',
  '#604CC3',
  '#E4003A',
  '#FF4191',
  '#597445',
  '#91DDCF',
  '#E5E1DA',
  '#9E9FA5',
  '#0A6847',
  '#640D6B',
  '#561C24',
]

interface PresetViewProps {
  setOpenColorPicker: Dispatch<SetStateAction<boolean>>
}

export function PresetView({ setOpenColorPicker }: PresetViewProps) {
  const [selectedColor, setSelectedColor] = useState('')

  return (
    <>
      <div className="flex gap-3 flex-wrap justify-center my-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className="relative flex justify-center items-center"
            type="button"
          >
            <div
              className="w-6 h-6 border-none rounded-full z-10"
              style={{ backgroundColor: color }}
            />
            <AnimatePresence mode="wait">
              {selectedColor === color && (
                <motion.div
                  transition={{ type: 'spring', duration: 0.3, bounce: 0.3 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className=" w-7 h-7 ring-2 ring-blue-500 absolute rounded-full"
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <Hex color={selectedColor} />
        <SaveButton
          color={selectedColor}
          setOpenColorPicker={setOpenColorPicker}
        />
      </div>
    </>
  )
}
