'use client'

import { listParamFields } from '@/actions/dialer'
import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  prevData?: string
  mailingId?: string
}
export function TextAreaWithParam({
  mailingId,
  value,
  onChange,
  ...props
}: TextareaProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [mailingParams, setMailingParams] = useState<Array<string>>([])
  const [mentionQuery, setMentionQuery] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)


  const params = useParams<{ campaignId: string; mailingId: string }>()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = e.target.value
    onChange?.(e)

    const mentionIndex = currentText.lastIndexOf('@')
    const afterMentionText = currentText.slice(mentionIndex + 1)

    if (mentionIndex !== -1 && !/\s/.test(afterMentionText)) {
      setMentionQuery(afterMentionText)

      if (afterMentionText.length >= 0) {
        setShowMenu(true)
      } else {
        setShowMenu(false)
      }
    } else {
      setShowMenu(false)
    }
  }

  const addMention = (mention: string) => {
    const mentionIndex = String(value).lastIndexOf('@')

    const newText =
      String(value).substring(0, mentionIndex + 1) +
      mention +
      ' ' +
      String(value).substring(mentionIndex + mentionQuery.length + 1)

    onChange?.({
      target: {
        value: newText,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>)

    setShowMenu(false)
    textareaRef.current?.focus()
  }

  useEffect(() => {
    if (params.mailingId) {
      listParamFields(params.mailingId).then((data) => setMailingParams(data))
    } else if (mailingId) {
      listParamFields(mailingId).then((data) => setMailingParams(data))
    }
  }, [params.mailingId, showMenu, mailingId])

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        className="w-full min-h-10 max-h-20 focus-visible:ring-sky-600 flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
        {...props}
        onChange={handleTextChange}
      />
      {showMenu && mailingParams.length > 0 && (
        <ScrollArea className="fixed h-40 max-h-60 bg-black/70 mt-2 rounded-md">
          <ul>
            {mailingParams.map((option, index) => (
              <li
                key={index}
                className="p-3 cursor-pointer hover:bg-zinc-500"
                onClick={() => addMention(option)}
              >
                <span>- @{option}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}
