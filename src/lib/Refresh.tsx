import { JSX } from 'solid-js'
import { svg_refresh } from './svgs'
import { refTooltip, type TooltipPosition } from '@ace/tooltip'


export function Refresh(props: { tooltipContent: string, onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>, position?: TooltipPosition }) {
  const tooltip = refTooltip(() => ({
    position: props.position,
    content: props.tooltipContent,
    $div: {class: 'refresh-tooltip'},
  }))

  return <>
    <button ref={tooltip} onClick={props.onClick} type="button" class="brand refresh">
      {svg_refresh()}
    </button>
  </>
}
