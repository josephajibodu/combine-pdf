import React, { useState, Fragment } from 'react'
import logo from '../../assets/icons/rocket.svg';
import { Dialog, Transition } from '@headlessui/react'

const Navigation = () => {
    let [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="bg-white dark:bg-gray-800  shadow mb-4">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="w-full justify-between flex items-center">
                        <a className="flex-shrink-0" href="/">
                            <img className="h-8 w-8" src={logo} alt="Combine PDF" />
                        </a>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a className="text-gray-700  hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="#about" onClick={() => setIsOpen(true)} >
                                    ABOUT
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="ml-4 flex items-center md:ml-6">
                        </div>
                    </div>

                    {/* <div className="-mr-2 flex md:hidden">
                        <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                            <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                </path>
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
            
            
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
               
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/80" aria-hidden="true" onClick={() => setIsOpen(false)} />
                
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    
                    <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white px-6 py-6">
                        <Dialog.Description className="transition mt-2 mb-6">
                            <p className='pb-4'>
                                This app was created to help make it easier for you to share patient education materials with your patients. 
                                With this app, you can select from a list of PDF files and combine them into a single PDF for downloading and printing.
                            </p>

                            <p className='pb-4'>
                                Using the app is simple: just choose the PDF files you want to combine by clicking on them, and then click the "Combine Files" button. 
                                The app will then create a single PDF file containing all of the selected documents, which you can download and print for your patients.
                            </p>

                            <p className='pb-4'>
                                We hope that this app helps you streamline your practice and provide better care for your patients. We welcome any feedback.
                            </p>
                        </Dialog.Description>

                        <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" 
                            onClick={() => setIsOpen(false)}>Ok</button>
                    </Dialog.Panel>

                </div>

            </Dialog>
            
        </nav>

        
    )
}

export default Navigation