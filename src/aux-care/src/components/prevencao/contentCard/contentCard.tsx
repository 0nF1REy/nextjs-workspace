import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientText?: boolean;
}

export function InfoCard({
  icon,
  title,
  description,
  gradientText,
}: InfoCardProps) {
  return (
    <Card className="w-full max-w-sm h-full flex flex-col border-2 border-gray-400 rounded-2xl shadow-md hover:border-gray-600">
      <CardHeader className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <span
          className={`text-base font-semibold ${
            gradientText
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              : "text-gray-800"
          }`}
        >
          {title}
        </span>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
}
