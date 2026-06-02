import { CancelConfirmation } from "@/components/CancelConfirmation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user;
    const res = await fetch(`http://localhost:8000/booking/${user.id}`, {
        headers: {
            authorization: "logged in"
        }
    });
    const bookings = await res.json();

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-10 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Bookings</p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-900">My Bookings</h1>
                <p className="mt-4 max-w-3xl text-slate-600">These are the trips you have booked. Review details, open each booking, or cancel if your plans change.</p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">No bookings found</p>
                    <p className="mt-2 text-slate-600">When you book a destination, it will appear here with the option to view or cancel.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <article key={booking._id ?? booking.destinationId ?? booking.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                            <div className="md:flex">
                                <div className="h-64 w-full md:h-auto md:w-80 shrink-0 overflow-hidden bg-slate-100">
                                    <Image
                                        src={booking.imageUrl || booking.image || '/assets/destinations/default.jpg'}
                                        alt={booking.destinationName || 'Booked destination'}
                                        width={500}
                                        height={400}
                                        className="h-full w-full object-cover p-4"
                                    />
                                </div>

                                <div className="flex-1 p-6 sm:p-8">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{booking.country || 'Location'}</p>
                                            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{booking.destinationName || 'Unknown destination'}</h2>
                                        </div>
                                        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                            ${booking.price ?? '—'}
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                        <div className="rounded-3xl bg-slate-50 p-4">
                                            <p className="text-sm text-slate-500">Departure</p>
                                            <p className="mt-2 text-base font-semibold text-slate-900">{booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : 'TBD'}</p>
                                        </div>
                                        <div className="rounded-3xl bg-slate-50 p-4">
                                            <p className="text-sm text-slate-500">Booked by</p>
                                            <p className="mt-2 text-base font-semibold text-slate-900">{booking.userName || 'You'}</p>
                                        </div>
                                        <div className="rounded-3xl bg-slate-50 p-4">
                                            <p className="text-sm text-slate-500">Status</p>
                                            <p className="mt-2 text-base font-semibold text-emerald-600">Confirmed</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                        <CancelConfirmation booking={booking}></CancelConfirmation>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyBookingsPage;