
import { ArrowUpRight, Calendar, MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
    const { _id, imageUrl, country, category, destinationName, duration, price } = destination;
    return (
        <div className="card text-gray-700 font-medium">
            <Image
                src={imageUrl}
                alt={destinationName}
                width={400}
                height={300}
            />
            <p className="flex gap-1 items-center"><MapPin /> {country}</p>
            <div className="flex justify-between font-bold">
                <p>{destinationName}</p>
                <p>{price}<sub>/Person</sub></p>
            </div>
            <p className="flex gap-1 items-center"><Calendar /> {duration}</p>
            <Link className="flex gap-2 items-center underline decoration-cyan-500 text-cyan-500 font-semibold" href={`destination/${_id}`}>BOOK NOW <ArrowUpRight /></Link>
        </div>
    );
};

export default DestinationCard;