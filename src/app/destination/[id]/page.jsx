
import Booking from "@/components/Booking";
import { DeleteDialogue } from "@/components/DeleteDialogue";
import EditDestination from "@/components/EditDestination";
import { DateField, Description, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const DestinationDetailsPage = async ({ params }) => {
    "use server"
    const { id } = await params;
    const res = await fetch(`http://localhost:8000/destination/${id}`);
    const data = await res.json();

    const {
        destinationName,
        imageUrl,
        country,
        category,
        duration,
        price,
        description,
    } = data;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="my-5 flex gap-3 justify-end">
                <EditDestination data={data}></EditDestination>
                <DeleteDialogue data={data}></DeleteDialogue>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={destinationName}
                            width={1400}
                            height={800}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-extrabold">{destinationName}</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            {country} · {category} · {duration}
                        </p>
                    </div>

                    <div className="prose max-w-none text-gray-700">
                        {description || "No description available."}
                    </div>
                </div>

                <aside>
                    <Booking data={data}></Booking>
                </aside>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;