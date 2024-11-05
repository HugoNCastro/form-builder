import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function ColorBox({ children }: Props) {
  return (
    <div className="bg-black/70 rounded-xl w-60 h-60 border border-indigo-600 dark:border-sky-600 absolute mt-2 p-4 z-10">
      <div className="absolute top-0 border-b-[8px] -translate-y-1.5 left-1/2 -translate-x-1/2 border-b-indigo-600 dark:border-b-sky-600 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent" />
      {children}
    </div>
  )
}
