import { useRouter } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Input } from "@/components/input";
import { Skeleton } from "@mantine/core";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  name: string;
  email: string;
  accountId: string;
  deposit: number;
  isLoading?: boolean;
}

export function UserNameForm({
  name,
  email,
  accountId,
  deposit,
  className,
  isLoading,
  ...props
}: UserNameFormProps) {
  const router = useRouter();

  return (
    <form className={cn(className)} {...props}>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CardHeader>
              <CardTitle>Name</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="w-full h-10"></Skeleton>
              ) : (
                <div className="grid gap-1">
                  <Input
                    id="name"
                    className="w-full"
                    size={32}
                    value={name}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="w-full h-10"></Skeleton>
              ) : (
                <div className="grid gap-1">
                  <Input
                    id="email"
                    className="w-full"
                    size={32}
                    value={email}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
      <Card className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CardHeader>
              <CardTitle>Account Id</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="w-full h-10"></Skeleton>
              ) : (
                <div className="grid gap-1">
                  <Input
                    id="accountId"
                    className="w-full"
                    size={32}
                    value={accountId}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="w-full h-10"></Skeleton>
              ) : (
                <div className="grid gap-1">
                  <Input
                    id="deposit"
                    className="w-full"
                    size={32}
                    value={deposit}
                    readOnly
                  />
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </form>
  );
}
