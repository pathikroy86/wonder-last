"use client"
import { authClient } from '@/lib/auth-client';
import { DateField, Description, Label } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Booking = ({ data }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const { departureDate, setDepartureDate } = useState(null)
    console.log(departureDate)
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold">${data.price} <span className="text-base font-medium">/Person</span></p>
                </div>
            </div>
            <DateField className="w-full my-5" name="date" onChange={setDepartureDate}>
                <Label>Departure Date</Label>
                <DateField.Group>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
                <Description>Enter your date of travel</Description>
            </DateField>

            <div className="mt-6">
                <Link href={`/destination/${data.id}/book`}>
                    <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-md font-semibold">
                        Book Now
                    </button>
                </Link>
                <Link href={`/destination`}>
                    <button className="w-full mt-3 border border-gray-200 text-gray-700 py-2 rounded-md">
                        Back to listings
                    </button>
                </Link>
            </div>

            <div className="mt-4 text-xs text-gray-500">
                Free cancellation within 24 hours when available.
            </div>
        </div>
    );
};

export default Booking;