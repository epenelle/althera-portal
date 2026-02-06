import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function LoginPage() {
    return (
        <div className="w-full max-w-md rounded-2xl border border-border bg-background/80 p-8 shadow-lg backdrop-blur">
            <div className="flex flex-col items-center gap-4">
                    <img
                        src="/logos/logo_althera_bleu.png"
                        alt="Althera"
                        className="h-10 w-auto"
                    />
                <div className="text-center">
                    <p className="mt-1 text-sm text-muted-foreground">
                        Connectez-vous pour accéder à votre espace de travail.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
                <SignInButton>
                    <button className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80">
                        Se connecter
                    </button>
                </SignInButton>
                <SignUpButton>
                    <button className="h-11 rounded-xl border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70">
                        S'inscrire
                    </button>
                </SignUpButton>
            </div>
        </div>
    );
}
