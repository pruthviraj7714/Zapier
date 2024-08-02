import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { WEBHOOK_BASE_URL } from "@/config/config";

export function ZapTable({
  zaps,
  onDelete,
}: {
  zaps: any;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              ID
            </th>
            <th className="py-3 px-5 border-b-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-5 border-b-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Web Hook URL
            </th>
            <th className="py-3 px-5 border-b-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-right text-sm font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {zaps.map((zap: any) => (
            <tr
              key={zap.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <td className="py-4 px-5 border-b border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
                {zap.id}
              </td>
              <td className="py-4 px-5 border-b border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <img
                    src={zap.trigger.type.image}
                    alt="Trigger"
                    className="w-10 h-10 rounded-full"
                  />
                  {zap.actions && zap.actions.length > 0 ? (
                    zap.actions.map((action: any) => (
                      <div key={action.id} className="flex items-center gap-2">
                        <img
                          src={action.type.image}
                          alt="Action"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      No actions found
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-5 border-b border-gray-200 dark:border-gray-600 text-sm text-blue-600 dark:text-blue-400 underline cursor-pointer">
                {WEBHOOK_BASE_URL}/{zap.userId}/{zap.id}
              </td>
              <td className="py-4 px-5 border-b border-gray-200 dark:border-gray-600 text-right text-sm flex items-center justify-end gap-2">
                <Button>
                  <Link href={`zap/${zap.id}`}>Go</Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your zap.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(zap.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
