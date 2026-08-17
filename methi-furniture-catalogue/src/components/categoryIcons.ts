import type { SVGProps } from 'react'
import {
  SofaIcon,
  MattressIcon,
  GlassIcon,
  MirrorIcon,
  WindowIcon,
  DoorIcon,
  SolarIcon,
  BatteryIcon,
} from './icons'

export const categoryIcons: Record<string, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  sofa: SofaIcon,
  mattress: MattressIcon,
  glass: GlassIcon,
  mirror: MirrorIcon,
  window: WindowIcon,
  door: DoorIcon,
  solar: SolarIcon,
  battery: BatteryIcon,
}
