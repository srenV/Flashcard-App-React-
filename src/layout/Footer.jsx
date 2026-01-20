import React from 'react'

export const Footer = () => {
  return (
    <footer className="flex justify-between p-2 px-5 border-2 border-r-4 text-xs md:text-lg border-b-4 rounded-full font-semibold">
          <div className="flex md:gap-5 md:flex-row flex-col">
            <a href="https://github.com/srenV">GitHub</a>
            <a href="https://www.linkedin.com/in/soren-timo-voigt/">LinkedIn</a>
          </div>
          <div>
            <span>
              <span className="hidden md:block">Challenge from{" "}</span>
              <a
                href="https://www.frontendmentor.io/challenges/flashcard-app"
                className="text-blue-400"
              >
                {" "}
                FrontendMentor
              </a>
            </span>
          </div>
          <div className="flex md:gap-5 md:flex-row flex-col">
            <a href="https://srenv.vercel.app/impressum" target="_blank">
              Impressum
            </a>
            <a className="text-nowrap" href="https://srenv.vercel.app/legal" target="_blank">
              Privacy Policy
            </a>
          </div>
        </footer>
  )
}
