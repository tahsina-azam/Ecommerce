import { User } from "@/global";
import { Group, Table, Text } from "@mantine/core";
import { useMemo } from "react";
import { Skeleton } from "../skeleton";

interface UserTableProps {
  data: User[];
  isLoading?: boolean;
}

const statusData = [
  "pending",
  "confirmed",
  "declined",
  "shipping",
  "delivered",
] as const;

export type OrderStatus = (typeof statusData)[number];

export default function UserTable({ data, isLoading }: UserTableProps) {
  const rows = useMemo(
    () =>
      data.map((item) => (
        <tr key={item.userId} className="text-sm">
          <td className="text-black/70">{item.userId}</td>
          <td>
            <Group spacing="sm">
              <div>
                <Text fz="sm" fw={500}>
                  {item.name}
                </Text>
                <Text fz="xs" c="dimmed">
                  {item.email}
                </Text>
              </div>
            </Group>
          </td>
          <td>{item.address}</td>
          <td>{item.accountId}</td>
        </tr>
      )),
    [data]
  );

  if (isLoading)
    return (
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Info</th>
            <th>Address</th>
            <th>Account Id</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 2 }).map((_, i) => (
            <tr key={i} className="text-sm">
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
              <td>
                <Skeleton className="w-[180px] h-[32px]"></Skeleton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>User Id</th>
          <th>Info</th>
          <th>Address</th>
          <th>Account Id</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
