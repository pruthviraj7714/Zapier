import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Link from "next/link";

export function ZapTable({ data }: { data: any }) {
  return (
    <Table>
      <TableCaption>My Zaps</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Last Edit</TableHead>
          <TableHead>Web Hook URL</TableHead>
          <TableHead>Running</TableHead>
          <TableHead className="text-right">Go</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d: any) => (
          <TableRow key={d.id}>
            <TableCell className="font-medium">{d.name}</TableCell>
            <TableCell>{d.lastEdit}</TableCell>
            <TableCell>{d.hookURL}</TableCell>
            <TableCell className="text-right">
              <Link href={`zap/${d.id}`}>Go</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
