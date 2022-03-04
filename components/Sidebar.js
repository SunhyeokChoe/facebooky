import { useSession } from 'next-auth/react'
import SidebarRow from './SidebarRow'
import {
  UserGroupIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline'
import {
  UsersIcon,
  DesktopComputerIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/solid'

function Sidebar() {
  const { data: session, loading } = useSession()

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow src={session.user.image} title={session.user.name} />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  )
}

export default Sidebar
