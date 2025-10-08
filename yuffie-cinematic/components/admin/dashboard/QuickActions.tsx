import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { quickActions } from "./constants";

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {quickActions.map((action) => (
        <Link href={action.href} key={action.href} passHref>
          <Button
            variant="outline"
            className={`cursor-pointer w-full h-16 bg-gray-800/50 border-gray-600/50 transition-all duration-300 ${action.className}`}
          >
            <div className="flex flex-col items-center gap-2">
              <FontAwesomeIcon icon={action.icon} />
              <span className="text-sm">{action.label}</span>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
}
