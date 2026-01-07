import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MovieDetailsProps } from "./types";

export function MovieDetails({ genre, duration }: MovieDetailsProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-900/40 text-gray-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-red-500">Detalhes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {genre && (
          <div>
            <span className="font-semibold">Gênero: </span>
            {genre.join(", ")}
          </div>
        )}
        {duration && (
          <div>
            <span className="font-semibold">Duração: </span>
            {duration} minutos
          </div>
        )}
      </CardContent>
    </Card>
  );
}
