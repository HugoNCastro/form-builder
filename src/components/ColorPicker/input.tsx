interface InputProps {
  label: string
}

export function Input({ label }: InputProps) {
  return (
    <div className="flex gap-1 justify-center items-center w-28 text-xs rounded-md py-1.5 px-2 border border-indigo-600 dark:border-sky-600">
      <span className="w-8 text-center">{label}</span>
      <input className="w-16 outline-none bg-transparent" />
    </div>
  )
}
