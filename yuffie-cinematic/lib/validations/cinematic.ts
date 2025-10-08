import { z } from "zod";

export const cinematicSchema = z.object({

  
});

export type CinematicForm = z.infer<typeof cinematicSchema>;
