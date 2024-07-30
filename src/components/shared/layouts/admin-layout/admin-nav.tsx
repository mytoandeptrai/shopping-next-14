import { CustomLink } from '@/components/custom/custom-link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItem = {
  title: string;
  shortcut: string;
  href: string;
};

const nav_items: NavItem[] = [
  {
    title: 'home',
    shortcut: '⇧⌘',
    href: '/',
  },
  {
    title: 'myaccount',
    shortcut: '⇧⌘P',
    href: '/account',
  },
  {
    title: 'settings',
    shortcut: '⇧⌘S',
    href: '/settings',
  },
];

const AdminNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full focus:ring-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <div className="mb-1 text-sm leading-none">mytoandeptrai</div>
            <div className="text-xs text-muted-foreground">mytoandn@email.com</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {nav_items.map((item) => (
            <DropdownMenuItem key={item.title + item.href} asChild>
              <CustomLink href={`/admin/${item.href}`} className="flex justify-between">
                <span className="grow">{item.title}</span>
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </CustomLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div>
            <span className="grow">{'logout'}</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminNav;
