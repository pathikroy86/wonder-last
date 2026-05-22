import Image from "next/image";
import Link from "next/link";

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:8000/destination/${id}`);
    const data = await res.json();
    console.log(data)

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

                <aside className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-2xl font-bold">${price} <span className="text-base font-medium">/Person</span></p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href={`/destination/${id}/book`}>
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
                </aside>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;