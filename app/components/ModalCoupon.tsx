"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { useGlobalConfig } from "@/hooks/useGlobalConfig";

type ModalCouponProps = {
    btn: number,
    offers?: any[],
    store?: any,
}

const ModalCoupon: React.FC<ModalCouponProps> = ({btn, offers = [], store}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
    const { data } = useGlobalConfig();

    const handleOpen = () => {
        // pick random offer when opening
        if (offers && offers.length > 0) {
            const idx = Math.floor(Math.random() * offers.length);
            const offer = offers[idx];

            // If we have an offer URL, use the "duplicate tab" trick:
            // 1) Open a new tab pointing to the current page with a query param indicating which offer to open
            // 2) Immediately navigate THIS (original) tab to the offer URL
            // The duplicate tab will read the query param and open the modal there.
            if (offer?.url) {
                try {
                    const sep = window.location.search ? '&' : '?';
                    const dupUrl = `${window.location.href}${sep}coupon_open=1&coupon_idx=${idx}`;
                    const dup = window.open(dupUrl, '_blank', 'noopener,noreferrer');
                    if (dup) {
                        try { dup.opener = null; } catch (e) { /* ignore */ }
                    }
                    // navigate original tab to the offer URL (user will see the duplicated tab)
                    window.location.href = offer.url;
                    // after this line, the current page will start navigating away.
                    return;
                } catch (e) {
                    // fallback: try a normal anchor click (best-effort)
                    try {
                        const a = document.createElement('a');
                        a.href = offer.url;
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } catch (err) {
                        // last fallback: window.open (may grab focus)
                        try { window.open(offer.url, '_blank', 'noopener,noreferrer'); } catch (er) { /* ignore */ }
                    }
                }
            }

            setSelectedOffer(offer);
        } else {
            setSelectedOffer(null);
        }

        setIsOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
    };

    // Auto-open modal when this page is loaded with coupon_open=1 and coupon_idx is present
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const open = params.get('coupon_open');
            const idx = params.get('coupon_idx');
            if (open === '1' && idx !== null && offers && offers.length > 0) {
                const i = parseInt(idx, 10);
                if (!Number.isNaN(i) && offers[i]) {
                    setSelectedOffer(offers[i]);
                    setIsOpen(true);
                    // animate after mount
                    setTimeout(() => setIsAnimating(true), 10);
                    // remove coupon params from URL to avoid reopening on reload
                    params.delete('coupon_open');
                    params.delete('coupon_idx');
                    const base = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
                    window.history.replaceState(null, '', base + window.location.hash);
                }
            }
        } catch (e) {
            // ignore
        }
    }, [offers]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setCoppy(0);
            setIsOpen(false);
            setIsAnimating(false); 
        }, 300);
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const [coppy, setCoppy] = useState(0)
    const handleCopy = () => {
        if (selectedOffer && selectedOffer.code) {
            navigator.clipboard.writeText(selectedOffer.code);
            setCoppy(1);
            return;
        }
    };

    return (
        <>
            {btn === 0 && 
                <button 
                    onClick={handleOpen}
                    className="capitalize text-[#019a04] my-4 font-medium px-6 py-1 border border-[#019a04] rounded-md transition hover:bg-[#019a04] hover:text-white"
                    type="button"
                >
                    Get Coupon Alert
                </button>
            }
            {btn === 1 &&
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
            {btn === 2 && 
                <button 
                    className="text-[#019a04] cursor-pointer"
                    onClick={handleOpen}
                >
                    {store.tenstore}
                </button>
            }
            {isOpen && (
                <div
                    onClick={handleClose}
                    className="fixed inset-0 z-10 grid h-screen w-screen place-items-center bg-[#00000060] 
                    bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 max-[435px]:flex max-[435px]:justify-center"
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
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${store.image}`}
                                alt="store"
                                className="w-25 h-25 rounded-[50%] border border-gray-200"
                            />
                            <p className="text-2xl line-clamp-2 max-w-[65%] font-medium text-gray-700">
                                {store?.tenstore || selectedOffer?.tenstore || "Up to $25 Off Site-wide"}
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
                                <div className="w-full h-full">
                                    <p className="mt-10 text-center">No coupons available at the moment.</p>
                                </div>
                            )}
                            <div className="mt-8">
                                <Image
                                    width={300}
                                    height={150}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.logo}`}
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
