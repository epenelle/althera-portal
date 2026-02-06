import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function LoginButtons() {
    return (
        <>
            <SignInButton />
            <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                </button>
            </SignUpButton>
        </>
    );
}
