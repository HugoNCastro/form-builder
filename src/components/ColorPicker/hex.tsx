interface HexProps {
  color: string
}

export function Hex({ color }: HexProps) {
  return (
    <div className="flex justify-center items-center w-full text-xs rounded-md py-1.5 px-2 border border-indigo-600 dark:border-sky-600">
      <span className="mr-2">HEX</span>
      <span className="w-20 text-center">{color}</span>
    </div>
  )
}
