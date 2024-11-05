'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { Tabs } from './tabs'
import { PresetView } from './preset-view'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = ['Preset']

interface ColorPanelProps {
  setOpenColorPicker: Dispatch<SetStateAction<boolean>>
}

export function ColorPanel({ setOpenColorPicker }: ColorPanelProps) {
  const [selectedTab, setSeletedTab] = useState(tabs[0])

  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSeletedTab={setSeletedTab}
      />
      <AnimatePresence mode="wait">
        {selectedTab === 'Preset' && (
          <motion.div
            key={'preset'}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.2, type: 'spring', bounce: 0.3 }}
          >
            <PresetView setOpenColorPicker={setOpenColorPicker} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
