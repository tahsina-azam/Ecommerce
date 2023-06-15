import { useRouter } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Input } from "@/components/input";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  name: string;
  email: string;
  accountId: string;
  deposit: number;
}

export function UserNameForm({
  name,
  email,
  accountId,
  deposit,
  className,
  ...props
}: UserNameFormProps) {
  const router = useRouter();

  return (
    <form className={cn(className)} {...props}>
      <Card>
        <div className="flex">
          <div>
            <CardHeader>
              <CardTitle>Name</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Input
                  id="name"
                  className="w-[400px]"
                  size={32}
                  value={name}
                  readOnly
                />
              </div>
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Input
                  id="name"
                  className="w-[400px]"
                  size={32}
                  value={email}
                  readOnly
                />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      <Card className="mt-4">
        <div className="flex">
          <div>
            <CardHeader>
              <CardTitle>Account Id</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Input
                  id="name"
                  className="w-[400px]"
                  size={32}
                  value={accountId}
                  readOnly
                />
              </div>
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <Input
                  id="name"
                  className="w-[400px]"
                  size={32}
                  value={deposit}
                  readOnly
                />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </form>
  );
}
