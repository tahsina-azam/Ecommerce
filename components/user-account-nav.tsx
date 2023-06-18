import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { User } from "@/global";
import { useClearCurrentUser, useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const handleSignOut = useClearCurrentUser();
  const router = useRouter();
  const { role } = useCurrentUser();

  const route =
    role === "admin"
      ? "/admin/bank-information"
      : role === "supplier"
      ? "/retailer/bank-information"
      : "/user/bank-information";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name, image: user.image }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-mono">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none font-sans">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuItem
          className="cursor-pointer font-sans"
          onSelect={(event) => {
            event.preventDefault();
            router.push(route);
          }}
        >
          Account Information
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer font-sans"
          onSelect={(event) => {
            event.preventDefault();
            handleSignOut();
            router.push("/sign-in");
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
