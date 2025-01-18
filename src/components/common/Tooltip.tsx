import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { FiInfo } from 'react-icons/fi'

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
}

const Tooltip = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 200,
}: TooltipProps) => {
  const defaultTrigger = (
    <div className="cursor-help">
      <FiInfo className="w-4 h-4 text-[#A0AEC0] hover:text-[#E2E8F0] transition-colors" />
    </div>
  );

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children || defaultTrigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            className="
              z-50
              overflow-hidden
              rounded-md
              bg-[#1E293B]
              border
              border-[#2D3748]
              px-3
              py-2
              text-sm
              text-[#E2E8F0]
              shadow-md
              animate-in
              fade-in-0
              zoom-in-95
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
              data-[side=left]:slide-in-from-right-2
              data-[side=right]:slide-in-from-left-2
              data-[side=top]:slide-in-from-bottom-2
            "
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[#2D3748]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
