import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const asciiArt = `            XXXX
           X    XX
          X  ***  X                XXXXX
         X  *****  X            XXX     XX
      XXXX ******* XXX      XXXX          XX
    XX   X ******  XXXXXXXXX                XX XXX
  XX      X ****  X                           X** X
 X        XX    XX     X                      X***X
X         //XXXX       X                      XXXX
X         //   X                             XX
X         //    X          XXXXXXXXXXXXXXXXXX/
X     XXX//    X          X
X    X   X     X         X
X    X    X    X        X
X   X    X    X        X                    XX
X    X   X    X        X                 XXX  XX
X    XXX      X        X               X  X X  X
X             X         X              XX X  XXXX
 X             X         XXXXXXXX\\     XX   XX  X
  XX            XX              X     X    X  XX
    XX            XXXX   XXXXXX/     X     XXXX
      XXX             XX***         X     X
         XXXXXXXXXXXXX *   *       X     X
                      *---* X     X     X
                     *-* *   XXX X     X
                     *- *       XXX   X
                    *- *X          XXX
                    *- *X  X          XXX
                   *- *X    X            XX
                   *- *XX    X             X
                  *  *X* X    X             X
                  *  *X * X    X             X
                 *  * X**  X   XXXX          X
                 *  * X**  XX     X          X
                *  ** X** X     XX          X
                *  **  X*  XXX   X         X
               *  **    XX   XXXX       XXX
              *  * *      XXXX      X     X
             *   * *          X     X     X
=======*******   * *           X     X      XXXXXXXX\\
      *         * *      /XXXXX      XXXXXXXX\\      )
 =====**********  *     X                     )  \\  )
   ====*         *     X               \\  \\   )XXXXX
=========**********       XXXXXXXXXXXXXXXXXXXXXX`;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">404</h1>
        <div className="h-8 w-px bg-foreground/20"></div>
        <p className="text-foreground">This page could not be found.</p>
      </div>

      <Button
        asChild
        size="lg"
        className="bg-primary hover:bg-primary/90 text-foreground min-w-[160px] rounded-full mb-8"
      >
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-4 max-w-sm">
          At least there&apos;s ASCII art:
        </p>
        <pre className="text-foreground text-[6px] md:text-[7px] leading-tight font-mono whitespace-pre overflow-x-auto text-left inline-block">
          {asciiArt}
        </pre>
      </div>
    </div>
  );
}
