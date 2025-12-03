"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import React from "react";
type ModalCouponProps = {
    btn: boolean,
    offers?: any[],
    storeUrl?: string,
}



const ModalCoupon: React.FC<ModalCouponProps> = ({btn, offers = [], storeUrl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<any | null>(null);

    const handleOpen = () => {
        // pick random offer when opening
        if (offers && offers.length > 0) {
            const idx = Math.floor(Math.random() * offers.length);
            setSelectedOffer(offers[idx]);
        } else {
            setSelectedOffer(null);
        }

        setIsOpen(true);
        // Trigger animation after modal is mounted
        setTimeout(() => setIsAnimating(true), 10);
    };

    const handleClose = () => {
        setIsAnimating(false);
        // Wait for animation to complete before unmounting
        setTimeout(() => {
            setCoppy(0);
            setIsOpen(false);
            setIsAnimating(false); // Reset for next open
        }, 300);
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const [coppy, setCoppy] = useState(0)
    const handleCopy = () => {
        if (selectedOffer && selectedOffer.code) {
            navigator.clipboard.writeText(selectedOffer.code);
            setCoppy(1);
            // open offer url if present
            if (selectedOffer.url) {
                window.open(selectedOffer.url, "_blank");
            }
            alert("Copied: " + selectedOffer.code);
            return;
        }

        // no offer: if storeUrl provided, navigate to it
        if (storeUrl) {
            window.open(storeUrl, "_blank");
            return;
        }
        alert("No coupon available");
    };

    return (
        <>
            {btn ? 
                <button 
                    onClick={handleOpen}
                    className="capitalize text-[#019a04] my-4 font-medium px-6 py-1 border border-[#019a04] rounded-md transition hover:bg-[#019a04] hover:text-white"
                    type="button"
                >
                    Get Coupon Alert
                </button>
                : 
                <div className="w-[235px] flex-none flex justify-center">
                    <button 
                        className="w-[180px] text-right h-10 border-2 border-dashed rounded-md relative text-xl text-[#019a04] group" 
                        style={{borderColor: "#019a04"}} 
                        onClick={handleOpen}
                    >
                        <p className="mr-5">zsdf</p> 
                        <div className="absolute text-white transition-all rounded-md get_code 
                            h-10 flex items-center w-[180px] -top-0.5 justify-center right-1 hover:right-6 duration-500 " 
                        > 
                            GET CODE
                        </div> 
                    </button>
                </div>
            }
            {isOpen && (
                <div
                    onClick={handleClose}
                    className="fixed inset-0 z-10 grid h-screen w-screen place-items-center bg-[#00000060] bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`relative m-4 p-4 w-2/5 min-w-[400px] max-w-[500px] rounded-lg bg-white shadow-sm transform transition-all duration-300 ${
                        isAnimating
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-28 opacity-0"
                        }`}
                    >
                        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800 gap-x-3 justify-center">
                            <Image
                                width={300}
                                height={300}
                                src={"/store/1.jpg"}
                                alt="store"
                                className="w-25 h-25 rounded-[50%] border border-gray-200"
                            />
                            <p className="text-2xl line-clamp-2 max-w-[65%] font-medium text-gray-700">
                                Up to $25 Off Site-wide
                            </p>
                        </div>
                            <div className="flex flex-col items-center relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                            {selectedOffer ? (
                                <>
                                    <p className="my-4">
                                        Copy the code and go to
                                        <span className="text-[#019a04] ml-1.5">{selectedOffer.name || 'the store'}</span>
                                    </p>
                                    <div className="h-12 flex items-center justify-center">
                                        <input 
                                            ref={inputRef}
                                            type="text"
                                            name="coupon"
                                            readOnly 
                                            className="h-full max-w-60 text-[22px] font-medium bg-[#e9ecef] border border-dashed text-center"
                                            style={{borderColor: "#019a04"}}
                                            value={selectedOffer.code || selectedOffer.offer || ''}
                                        />
                                        <button 
                                            className="capitalize px-6 h-full bg-[#019a04] text-white cursor-pointer"
                                            onClick={handleCopy}
                                        >
                                            {coppy === 1 ? "Copied!" : "Tap to copy"}
                                        </button>
                                    </div>
                                    <div className="mt-8 text-[#019a04] capitalize">
                                        more {selectedOffer.name || 'store'} &gt; &gt;
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="my-4 text-center">No coupons available at the moment.</p>
                                    <div className="h-12 flex items-center justify-center">
                                        <input 
                                            ref={inputRef}
                                            type="text"
                                            name="coupon"
                                            readOnly 
                                            className="h-full max-w-60 text-[22px] font-medium bg-[#e9ecef] border border-dashed text-center"
                                            style={{borderColor: "#019a04"}}
                                            value={""}
                                        />
                                        <button 
                                            className="capitalize px-6 h-full bg-[#019a04] text-white cursor-pointer"
                                            onClick={handleCopy}
                                        >
                                            Visit store
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="mt-8">
                                <Image
                                    width={300}
                                    height={150}
                                    src={"/images/logo.jpg"}
                                    alt="logo"
                                    className="w-25 object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                            <button 
                                onClick={handleClose}
                                className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalCoupon;
