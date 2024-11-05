import { motion } from 'framer-motion'

interface TabsProps {
  tabs: string[]
  selectedTab: string
  setSeletedTab: React.Dispatch<React.SetStateAction<string>>
}

export function Tabs({ selectedTab, setSeletedTab, tabs }: TabsProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <div
          key={tab}
          className="relative h-7 w-16 flex justify-center items-center"
        >
          <button
            onClick={() => setSeletedTab(tab)}
            type="button"
            className={`text-xs transition-colors ${selectedTab === tab ? `text-indigo-300 dark:text-sky-300` : `text-indigo-400 dark:text-sky-400`}`}
          >
            {tab}
          </button>
          {selectedTab === tab && (
            <motion.div
              transition={{ type: 'spring', duration: 0.3, bounce: 0.3 }}
              layoutId="underline"
              className="absolute top-0 left-0 h-full border border-indigo-600 dark:border-sky-600 -z-10 rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  )
}
